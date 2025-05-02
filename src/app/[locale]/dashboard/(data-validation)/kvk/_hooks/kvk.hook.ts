import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { addressValidationApi } from '@/services/api/address-validation-api'
import { useAddressValidation } from '@/services/swr/use-address-validation'
import { normalizeString } from '@/utils/string'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/kvk.schema'

interface FieldDifferences {
  streetAddress: boolean
  houseNumber: boolean
  houseNumberExtension: boolean
  postcode: boolean
  city: boolean
  country: boolean
}

interface SimilarityStatus {
  status: string
  color: string
}

export default function useKvkForm() {
  const t = useTranslations('dataValidation')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { data: session } = useSession()

  const { data: kvkAddress, isLoading: isLoadingData } = useAddressValidation('kvk', currentPage)

  // Get the array of data items and pagination info from kvkAddress
  const dataItems = kvkAddress?.data || []

  // kvkAddress adaptor fields
  const total = kvkAddress?.totalData || 0
  const perPage = kvkAddress?.perPage || 10
  const lastPage = kvkAddress?.lastPage || 1

  // Use refs to track previous dataItems length and currentIndex
  const prevDataItemsLength = useRef(0)
  // Create debounce timeout ref outside the debounce function
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const prevCurrentIndex = useRef(currentIndex)

  // Initialize form once data is loaded
  useEffect(() => {
    if (dataItems.length > 0 && currentIndex < dataItems.length) {
      try {
        debouncedUpdateForm(dataItems, currentIndex)
      } catch (error) {
        console.error('Failed to initialize form with data:', error)
      }
    }
  }, [kvkAddress])

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    // Initial values (will be updated on data load)
    values: {
      companyName: '',
      streetAddress: '',
      houseNumber: '',
      houseNumberExtension: '',
      postcode: '',
      city: '',
      country: '',
      kvkNumber: '',
      validationAction: '',
      companyNameOriginal: '',
      kvkNumberOriginal: '',
      streetAddressOriginal: '',
      houseNumberOriginal: '',
      houseNumberExtensionOriginal: '',
      postcodeOriginal: '',
      cityOriginal: '',
      countryOriginal: '',
    },
  })

  // Debounce function to prevent too many form updates
  const debounce = (func: Function, delay: number) => {
    return (...args: any[]) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  // Create debounced version of updateFormWithCurrentItem
  const debouncedUpdateForm = useCallback(
    debounce((data: any[], index: number) => {
      updateFormWithCurrentItem(data, index)
    }, 300),
    []
  )

  const updateFormWithCurrentItem = (data: any[], index: number) => {
    const currentItem = data[index]
    if (!currentItem) return

    try {
      // Get current values to compare
      const currentFormValues = methods.getValues()

      const formValues = {
        companyName: currentItem.reference?.companyInfo?.companyname || '',
        streetAddress: currentItem.differences?.streetName || '',
        houseNumber: currentItem.differences?.houseNumber?.toString() || '',
        houseNumberExtension: currentItem.differences?.houseNumberSuffix || '',
        postcode: currentItem.differences?.postalCode || '',
        city: currentItem.differences?.city || '',
        country: currentItem.differences?.country || '',
        kvkNumber: currentItem.reference?.companyInfo?.chamberOfCommerceId || '',
        validationAction: currentFormValues.validationAction || '',
        // Original values
        companyNameOriginal: currentItem.reference?.companyInfo?.companyname || '',
        kvkNumberOriginal: currentItem.reference?.companyInfo?.chamberOfCommerceId || '',
        streetAddressOriginal: currentItem.address?.streetname || '',
        houseNumberOriginal: currentItem.address?.housenumber || '',
        houseNumberExtensionOriginal: currentItem.address?.housenumberSuffix || '',
        postcodeOriginal: currentItem.address?.postalcode || '',
        cityOriginal: currentItem.address?.city || '',
        countryOriginal: currentItem.address?.country?.name || '',
      }

      // Check if values have actually changed before resetting the form
      const hasChanges = Object.keys(formValues).some(
        key =>
          formValues[key as keyof typeof formValues] !==
          currentFormValues[key as keyof typeof currentFormValues]
      )

      if (hasChanges) {
        methods.reset(formValues, {
          keepDefaultValues: false,
          keepDirty: false,
        })
      }
    } catch (error) {
      console.error('Error setting form values:', error)
    }
  }

  const goToNext = () => {
    // If at the end of current page data and there are more pages
    if (currentIndex === dataItems.length - 1 && currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
      setCurrentIndex(0)
    }
    // If not at the end of current page data
    else if (currentIndex < dataItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    // If at the beginning of current page data and not on first page
    if (currentIndex === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
      // Will need to set index to last item of previous page
      // This will happen after the data loads, based on the useEffect
    }
    // If not at the beginning of current page data
    else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Calculate the overall position in the dataset
  const calculateOverallPosition = () => {
    const previousPagesItems = (currentPage - 1) * perPage
    const positionOnCurrentPage = currentIndex + 1

    return {
      start: previousPagesItems + positionOnCurrentPage,
      end: total,
    }
  }

  // Get the similarity status based on score
  const getSimilarityStatus = (score: number): SimilarityStatus => {
    if (score >= 97 && score < 100) {
      return {
        status: 'Need to be checked',
        color: 'light-success',
      }
    } else if (score >= 70 && score < 97) {
      return {
        status: 'Similar',
        color: 'warning',
      }
    } else {
      return {
        status: 'Invalid',
        color: 'light-danger',
      }
    }
  }

  // Get the current item's similarity status
  const currentSimilarityStatus = dataItems[currentIndex]
    ? getSimilarityStatus(dataItems[currentIndex].similarityScore)
    : { status: '', color: '' }

  const validateKvkData = async (data: InferType<typeof schema>, action: 'accept' | 'reject') => {
    if (dataItems.length === 0 || !dataItems[currentIndex]) {
      return
    }

    let submitData = {
      streetname: data.streetAddress,
      housenumber: data.houseNumber,
      housenumberSuffix: data.houseNumberExtension,
      postalcode: data.postcode,
      country: data.country,
      userName: session?.user?.email,
      type: action,
      city: data.city,
      companyName: data.companyName,
      chamberOfCommerceId: data.kvkNumber,
    }

    try {
      const res = await addressValidationApi.update(dataItems[currentIndex].id, submitData)

      if (res.ok) {
        showToast({
          variant: 'success',
          body: t('addressAccepted'),
        })

        // If we're at the last item on the current page but there are more pages
        if (currentIndex === dataItems.length - 1 && currentPage < lastPage) {
          goToNext()
        }
        // If we're at the last item on the current page and it's the last page
        else if (
          currentIndex === dataItems.length - 1 &&
          currentPage === lastPage &&
          currentIndex > 0
        ) {
          setCurrentIndex(currentIndex - 1)
        }
      }
    } catch (apiError) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const currentFormValues = { ...data }

    const action = data.validationAction as 'accept' | 'reject'

    try {
      await withLoading(() => validateKvkData(currentFormValues, action))
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const handleAccept = () => {
    methods.handleSubmit(onSubmit)()

    setTimeout(() => {
      if (dataItems[currentIndex]) {
        methods.setValue('validationAction', 'accept')

        // Directly set form values from chamber one by one
        methods.setValue(
          'companyNameOriginal',
          dataItems[currentIndex].reference.companyInfo.companyname
        )
        methods.setValue('streetAddressOriginal', dataItems[currentIndex].differences.streetName)
        methods.setValue(
          'houseNumberOriginal',
          dataItems[currentIndex].differences.houseNumber.toString()
        )
        methods.setValue(
          'houseNumberExtensionOriginal',
          dataItems[currentIndex].differences.houseNumberSuffix || ''
        )
        methods.setValue('postcodeOriginal', dataItems[currentIndex].differences.postalCode)
        methods.setValue('cityOriginal', dataItems[currentIndex].differences.city)
        methods.setValue('countryOriginal', dataItems[currentIndex].differences.country)
        methods.setValue(
          'kvkNumberOriginal',
          dataItems[currentIndex].reference.companyInfo.chamberOfCommerceId
        )
      }
    }, 500)
  }

  const handleReject = () => {
    goToNext()
  }

  const position = calculateOverallPosition()

  // Check if field values are different to highlight differences
  const getFieldDifferences = (): FieldDifferences => {
    if (
      !dataItems[currentIndex] ||
      !dataItems[currentIndex].differences ||
      !dataItems[currentIndex].address
    ) {
      return {
        streetAddress: false,
        houseNumber: false,
        houseNumberExtension: false,
        postcode: false,
        city: false,
        country: false,
      }
    }

    const current = dataItems[currentIndex]

    try {
      const differences = {
        streetAddress:
          normalizeString(current.differences?.streetName) !==
          normalizeString(current.address?.streetname),
        houseNumber:
          normalizeString(current.differences?.houseNumber?.toString()) !==
          normalizeString(current.address?.housenumber),
        houseNumberExtension:
          normalizeString(current.differences?.houseNumberSuffix) !==
          normalizeString(current.address?.housenumberSuffix),
        postcode:
          normalizeString(current.differences?.postalCode) !==
          normalizeString(current.address?.postalcode),
        city: normalizeString(current.differences?.city) !== normalizeString(current.address?.city),
        country:
          normalizeString(current.differences?.country) !==
          normalizeString(current.address?.country?.name),
      }

      return differences
    } catch (error) {
      return {
        streetAddress: false,
        houseNumber: false,
        houseNumberExtension: false,
        postcode: false,
        city: false,
        country: false,
      }
    }
  }

  const fieldDifferences = getFieldDifferences()

  return {
    methods,
    onSubmit,
    goToNext,
    goToPrevious,
    currentPage,
    setCurrentPage,
    position,
    totalItems: total,
    isLoading: isLoadingData,
    isSubmitting,
    hasNextPage: currentPage < lastPage,
    hasPreviousPage: currentPage > 1,
    hasNextItem: currentIndex < dataItems.length - 1 || currentPage < lastPage,
    hasPreviousItem: currentIndex > 0 || currentPage > 1,
    handleAccept,
    handleReject,
    similarityStatus: currentSimilarityStatus,
    currentItem: dataItems[currentIndex],
    fieldDifferences,
  }
}
