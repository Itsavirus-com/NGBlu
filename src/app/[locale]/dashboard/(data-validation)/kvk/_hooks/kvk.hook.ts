import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { addressValidationApi } from '@/services/api/address-validation-api'
import { KvkData } from '@/services/swr/models/address-validation.type'
import { useAddressValidation } from '@/services/swr/use-address-validation'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/kvk.schema'

interface SimilarityStatus {
  status: string
  color: string
}

// Define form values type
export type FormValuesKvk = InferType<typeof schema>

export default function useKvkForm() {
  const t = useTranslations('dataValidation')
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { data: session } = useSession()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentValidation, setCurrentValidation] = useState<KvkData | null>(null)
  const [loadingType, setLoadingType] = useState<'original' | 'kvk' | null>(null)
  const previousValidationId = useRef<number | null>(null)

  const {
    data: kvkAddress,
    mutate: invalidateKvkAddress,
    isLoading: isLoadingData,
  } = useAddressValidation<KvkData>('kvk', currentPage)

  // Get the array of data items and pagination info from kvkAddress
  const dataItems = kvkAddress?.data || []

  // kvkAddress adaptor fields
  const total = kvkAddress?.totalData || 0
  const perPage = kvkAddress?.perPage || 10
  const lastPage = kvkAddress?.lastPage || 1

  const methods = useForm<FormValuesKvk>({
    resolver: yupResolver(schema),
    // Initial values (will be updated on data load)
    defaultValues: {
      // KVK values
      companyName: '',
      streetAddress: '',
      houseNumber: '',
      houseNumberExtension: '',
      postcode: '',
      city: '',
      country: '',
      kvkNumber: '',
      // Original values
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

  // Get the similarity status based on score
  const getSimilarityStatus = (score: number): SimilarityStatus => {
    switch (true) {
      case score === 100:
        return {
          status: 'Valid',
          color: 'success',
        }
      case score >= 97 && score < 100:
        return {
          status: 'Need to be checked',
          color: 'light-success',
        }
      case score >= 70 && score < 97:
        return {
          status: 'Similar',
          color: 'warning',
        }
      default:
        return {
          status: 'Invalid',
          color: 'danger',
        }
    }
  }

  // Get the current item's similarity status
  const currentSimilarityStatus = useMemo(() => {
    return currentValidation
      ? getSimilarityStatus(currentValidation.similarityScore)
      : { status: '', color: '' }
  }, [currentValidation])

  // Initialize form once data is loaded
  useEffect(() => {
    if (!kvkAddress?.data?.[currentIndex]) return

    const validation = kvkAddress.data[currentIndex] as KvkData

    // Skip if we've already processed this validation
    if (previousValidationId.current === validation.id) return

    // Update ref to prevent unnecessary reruns
    previousValidationId.current = validation.id

    // Update validation state
    setCurrentValidation(validation)

    // Extract data for form
    const { address, differences, reference } = validation

    // Reset form with new values
    const formValues = {
      // KVK values
      companyName: differences?.companyname?.value || '',
      streetAddress: differences?.streetname?.value || '',
      houseNumber: differences?.housenumber?.value?.toString() || '',
      houseNumberExtension: differences?.housenumberSuffix?.value || '',
      postcode: differences?.postalcode?.value || '',
      city: differences?.city?.value || '',
      country: differences?.country?.value || '',
      kvkNumber: reference?.companyInfo?.chamberOfCommerceId || '',
      // Original values
      companyNameOriginal: reference?.companyInfo?.companyname || '',
      kvkNumberOriginal: reference?.companyInfo?.chamberOfCommerceId || '',
      streetAddressOriginal: address?.streetname || '',
      houseNumberOriginal: address?.housenumber || '',
      houseNumberExtensionOriginal: address?.housenumberSuffix || '',
      postcodeOriginal: address?.postalcode || '',
      cityOriginal: address?.city || '',
      countryOriginal: address?.country?.name || '',
    }

    methods.reset(formValues)
  }, [kvkAddress, currentIndex])

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

  const validateKvkData = async (data: FormValuesKvk, type: 'original' | 'kvk') => {
    if (dataItems.length === 0 || !dataItems[currentIndex]) {
      return
    }

    let submitDataKVK = {
      streetname: data.streetAddress || '',
      housenumber: data.houseNumber || '',
      housenumberSuffix: data.houseNumberExtension || '',
      postalcode: data.postcode || '',
      country: data.country || '',
      username: session?.user?.email || '',
      type: 'accept',
      city: data.city || '',
      companyname: data.companyName || '',
      chamberOfCommerceId: data.kvkNumber || '',
    }

    let submitDataOriginal = {
      streetname: data.streetAddressOriginal || '',
      housenumber: data.houseNumberOriginal || '',
      housenumberSuffix: data.houseNumberExtensionOriginal || '',
      postalcode: data.postcodeOriginal || '',
      country: data.countryOriginal || '',
      username: session?.user?.email || '',
      type: 'accept',
      city: data.cityOriginal || '',
      companyname: data.companyNameOriginal || '',
    }

    try {
      const submitData =
        type === 'kvk'
          ? omitNullAndUndefined(submitDataKVK)
          : omitNullAndUndefined(submitDataOriginal)
      const res = await addressValidationApi.update(dataItems[currentIndex].id, submitData)

      if (res.ok) {
        showToast({
          variant: 'success',
          body: t('addressAccepted'),
        })

        if (currentIndex === dataItems.length - 1 && currentPage < lastPage) {
          invalidateKvkAddress()
        }
        // If we're at the last item on the current page and it's the last page
        else if (currentIndex === dataItems.length - 1 && currentPage === lastPage) {
          invalidateKvkAddress()
        } else if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1)
        }
      }
    } catch (apiError) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: FormValuesKvk) => {
    const currentFormValues = { ...data }

    try {
      await withLoading(() => validateKvkData(currentFormValues, 'kvk'))
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const handleAccept = (type: 'original' | 'kvk') => {
    setLoadingType(type)
    methods.handleSubmit(data => {
      const currentFormValues = { ...data }
      withLoading(async () => {
        try {
          await validateKvkData(currentFormValues, type)
        } finally {
          setLoadingType(null)
        }
      })
    })()
  }

  const position = calculateOverallPosition()

  // Get field-level similarity scores for highlighting
  const getFieldSimilarityScores = () => {
    if (!dataItems[currentIndex] || !dataItems[currentIndex].differences) {
      return {}
    }

    const current = dataItems[currentIndex].differences

    try {
      return {
        companyName: current.companyname?.similarityScore,
        streetName: current.streetname?.similarityScore,
        houseNumber: current.housenumber?.similarityScore,
        houseNumberExtension: current.housenumberSuffix?.similarityScore,
        postalcode: current.postalcode?.similarityScore,
        city: current.city?.similarityScore,
        country: current.country?.similarityScore,
      }
    } catch (error) {
      return {}
    }
  }

  // Get status and color for each field based on similarity score
  const getFieldSimilarityStatuses = () => {
    if (!dataItems[currentIndex] || !dataItems[currentIndex].differences) {
      return {}
    }

    const scores = getFieldSimilarityScores()
    const result: Record<string, SimilarityStatus | undefined> = {}

    try {
      // Only add fields that don't have Valid status (score < 100)
      if (scores.companyName !== undefined && scores.companyName < 100) {
        result.companyName = getSimilarityStatus(scores.companyName)
      }

      if (scores.streetName !== undefined && scores.streetName < 100) {
        result.streetName = getSimilarityStatus(scores.streetName)
      }

      if (scores.houseNumber !== undefined && scores.houseNumber < 100) {
        result.houseNumber = getSimilarityStatus(scores.houseNumber)
      }

      if (scores.houseNumberExtension !== undefined && scores.houseNumberExtension < 100) {
        result.houseNumberExtension = getSimilarityStatus(scores.houseNumberExtension)
      }

      if (scores.postalcode !== undefined && scores.postalcode < 100) {
        result.postalcode = getSimilarityStatus(scores.postalcode)
      }

      if (scores.city !== undefined && scores.city < 100) {
        result.city = getSimilarityStatus(scores.city)
      }

      if (scores.country !== undefined && scores.country < 100) {
        result.country = getSimilarityStatus(scores.country)
      }

      return result
    } catch (error) {
      return {}
    }
  }

  const fieldSimilarityStatuses = getFieldSimilarityStatuses()

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
    loadingType,
    hasNextPage: currentPage < lastPage,
    hasPreviousPage: currentPage > 1,
    hasNextItem: currentIndex < dataItems.length - 1 || currentPage < lastPage,
    hasPreviousItem: currentIndex > 0 || currentPage > 1,
    handleAccept,
    similarityStatus: currentSimilarityStatus,
    currentItem: dataItems[currentIndex],
    fieldSimilarityStatuses,
  }
}
