import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { addressValidationApi } from '@/services/api/address-validation-api'
import { GoogleData } from '@/services/swr/models/address-validation.type'
import { useAddressValidation } from '@/services/swr/use-address-validation'
import { omitNullAndUndefined } from '@/utils/object'

import { schema } from '../_schemas/google.schema'

interface AddressSuggestion {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
  latitude: number | null
  longitude: number | null
  street?: string
  streetNumber?: string
  subpremise?: string
  postalCode?: string
  city?: string
  country?: string
  fieldName?: string
}

interface FormValues {
  // Original address fields (read-only)
  streetAddressOriginal: string
  houseNumberOriginal: string
  houseNumberExtensionOriginal: string
  postcodeOriginal: string
  cityOriginal: string
  countryOriginal: string
  latOriginal: string
  lonOriginal: string

  // Proposed address fields (editable)
  streetAddress: string
  houseNumber: string
  houseNumberExtension: string
  postcode: string
  city: string
  country: string
  lat: string
  lon: string
}

interface SimilarityStatus {
  status: string
  color: string
}

export default function useGoogleForm() {
  const t = useTranslations('dataValidation')
  const { showToast, showUnexpectedToast } = useToast()
  const { data: session } = useSession()

  const [currentPage, setCurrentPage] = useState(1)
  const [currentValidation, setCurrentValidation] = useState<GoogleData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingType, setLoadingType] = useState<'original' | 'google' | null>(null)
  const previousValidationId = useRef<number | null>(null)

  // Fetch validation data from API
  const {
    data: validationData,
    mutate: invalidateGoogleAddress,
    isLoading,
  } = useAddressValidation<GoogleData>('google', currentPage, 1)

  // Get the similarity status based on score - define outside of render to avoid recreation
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
          color: 'light-danger',
        }
    }
  }

  // Initialize form with empty values first
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      // Original address fields
      streetAddressOriginal: '',
      houseNumberOriginal: '',
      houseNumberExtensionOriginal: '',
      postcodeOriginal: '',
      cityOriginal: '',
      countryOriginal: '',
      latOriginal: '',
      lonOriginal: '',

      // Proposed address fields
      streetAddress: '',
      houseNumber: '',
      houseNumberExtension: '',
      postcode: '',
      city: '',
      country: '',
      lat: '',
      lon: '',
    },
  })

  // Calculate current similarity status using useMemo to prevent unnecessary recalculations
  const currentSimilarityStatus = useMemo(() => {
    return currentValidation
      ? getSimilarityStatus(currentValidation.similarityScore)
      : { status: '', color: '' }
  }, [currentValidation])

  // Update form and current validation when data changes
  useEffect(() => {
    if (!validationData?.data?.[0]) return

    const validation = validationData.data[0] as GoogleData

    // Skip if we've already processed this validation
    if (previousValidationId.current === validation.id) return

    // Update ref to prevent unnecessary reruns
    previousValidationId.current = validation.id

    // Update validation state
    setCurrentValidation(validation)

    // Extract data for form
    const { address, differences } = validation

    // Reset form with new values - use the stable version to avoid dependency loops
    const formValues = {
      // Original address fields
      streetAddressOriginal: address.streetname || '',
      houseNumberOriginal: address.housenumber || '',
      houseNumberExtensionOriginal: address.housenumberSuffix || '',
      postcodeOriginal: address.postalcode || '',
      cityOriginal: address.city || '',
      countryOriginal: address.country?.name || '',
      latOriginal: address.lat || '',
      lonOriginal: address.lng || '',

      // Proposed address fields
      streetAddress: differences?.streetname?.value || '',
      houseNumber: differences?.housenumber?.value || '',
      houseNumberExtension: differences?.housenumberSuffix?.value || '',
      postcode: differences?.postalcode?.value || '',
      city: differences?.city?.value || '',
      country: differences?.country?.value || '',
      lat: differences?.geocode?.location?.latitude?.toString() || '',
      lon: differences?.geocode?.location?.longitude?.toString() || address.lng || '',
    }

    methods.reset(formValues)
  }, [validationData]) // Only depend on validationData to avoid loops

  const onSubmit = async (data: FormValues) => {
    if (!currentValidation) return

    try {
      // Update validation with accepted or rejected status
      await addressValidationApi.update(currentValidation.id, {
        status: 'accept',
        address: {
          streetname: data.streetAddress,
          housenumber: data.houseNumber,
          housenumberSuffix: data.houseNumberExtension,
          postalcode: data.postcode,
          city: data.city,
          country: data.country,
          lat: data.lat,
          lng: data.lon,
        },
      })

      // Refresh validation data
      await invalidateGoogleAddress()

      // Go to next validation if available
      if (validationData && currentPage < validationData.lastPage) {
        setCurrentPage(prev => prev + 1)
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (validationData && currentPage < validationData.lastPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const mapCoordinates = useMemo(() => {
    if (!currentValidation) {
      return { latitude: 0, longitude: 0 }
    }

    return (
      currentValidation.differences?.geocode?.location || {
        latitude: parseFloat(currentValidation.address?.lat || '0'),
        longitude: parseFloat(currentValidation.address?.lng || '0'),
      }
    )
  }, [currentValidation])

  const validateGoogleData = async (data: FormValues, type: 'original' | 'google') => {
    if (!currentValidation) {
      return
    }

    let submitDataGoogle = {
      streetname: data.streetAddress || '',
      housenumber: data.houseNumber || '',
      housenumberSuffix: data.houseNumberExtension || '',
      postalcode: data.postcode || '',
      country: data.country || '',
      username: session?.user?.email || '',
      type: 'accept',
      city: data.city || '',
      lat: data.lat || '',
      lng: data.lon || '',
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
      lat: data.latOriginal || '',
      lng: data.lonOriginal || '',
    }

    try {
      const submitData =
        type === 'google'
          ? omitNullAndUndefined(submitDataGoogle)
          : omitNullAndUndefined(submitDataOriginal)
      const res = await addressValidationApi.update(currentValidation.id, submitData)
      if (res.ok) {
        showToast({
          variant: 'success',
          body: t('addressAccepted'),
        })

        invalidateGoogleAddress()
      }
    } catch (apiError) {
      showUnexpectedToast()
    }
  }

  const handleAccept = async (type: 'original' | 'google') => {
    setIsSubmitting(true)
    setLoadingType(type)
    try {
      await validateGoogleData(methods.getValues(), type)
    } finally {
      setIsSubmitting(false)
      setLoadingType(null)
    }
  }

  // Get validation details for UI display
  const differences = (currentValidation?.differences || {}) as GoogleData['differences']

  // Add state to track map coordinates from address selection
  const [selectedMapCoords, setSelectedMapCoords] = useState<{ lat: number; lng: number } | null>(
    null
  )

  // New function to handle address selection
  const handleAddressSelect = (place: AddressSuggestion) => {
    if (!place) return

    const lat = place.latitude || 0
    const lng = place.longitude || 0

    // Always use 6 decimal places which is within the required 2-9 range
    methods.setValue('lat', lat.toFixed(6))
    methods.setValue('lon', lng.toFixed(6))

    // Update map coordinates state
    if (lat && lng) {
      setSelectedMapCoords({ lat, lng })
    }

    // If we're handling a specific field and fieldName is provided, update that field directly
    if (place.fieldName) {
      methods.setValue(place.fieldName as keyof FormValues, place.street || '')
    } else {
      // Update address fields - use only street name for street address
      methods.setValue('streetAddress', place.street || '')
    }

    if (place.streetNumber) {
      methods.setValue('houseNumber', place.streetNumber)
    }

    if (place.subpremise) {
      methods.setValue('houseNumberExtension', place.subpremise)
    }

    if (place.postalCode) {
      methods.setValue('postcode', place.postalCode)
    }

    if (place.city) {
      methods.setValue('city', place.city)
    }

    if (place.country) {
      methods.setValue('country', place.country)
    }
  }

  // Combine the original map coordinates with any selected coordinates
  const displayMapCoordinates = useMemo(() => {
    if (selectedMapCoords) {
      return selectedMapCoords
    }

    return {
      lat: mapCoordinates?.latitude || 0,
      lng: mapCoordinates?.longitude || 0,
    }
  }, [selectedMapCoords, mapCoordinates])

  // Reset selected coordinates when currentValidation changes
  useEffect(() => {
    setSelectedMapCoords(null)
  }, [currentValidation?.id])

  return {
    onSubmit,
    handlePrevious,
    handleNext,
    handleAccept,
    handleAddressSelect,
    methods,
    isSubmitting,
    loadingType,
    differences,
    currentSimilarityStatus,
    currentValidation,
    paginationInfo: validationData
      ? {
          currentPage: validationData.currentPage,
          lastPage: validationData.lastPage,
          total: validationData.totalData,
        }
      : null,
    mapCoordinates,
    displayMapCoordinates,
    isLoading,
  }
}
