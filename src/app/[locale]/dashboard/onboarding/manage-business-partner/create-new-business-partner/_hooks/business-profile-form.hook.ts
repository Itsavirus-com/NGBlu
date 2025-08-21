'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { swrApi } from '@/services/api/swr-api'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useBusinessProfileForm = () => {
  const { control, setValue } = useFormContext<CreateBusinessPartnerFormData>()

  // KVK and address lookup states
  const [isValidatingKvk, setIsValidatingKvk] = useState(false)
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false)
  const [kvkValidationData, setKvkValidationData] = useState<any>(null)
  const [addressLookupData, setAddressLookupData] = useState<any>(null)
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  // Use refs to prevent infinite loops
  const lastProcessedAddressRef = useRef<string>('')
  const shouldRenderMapRef = useRef<boolean>(false)
  const [shouldRenderMap, setShouldRenderMap] = useState(false)

  // Watch field values - Address fields
  const kvkNumber = useWatch({ control, name: 'chamberOfCommerceId' })
  const postalCodeHouse = useWatch({ control, name: 'postalCodeHouse' })
  const streetName = useWatch({ control, name: 'address.streetname' })
  const houseNumber = useWatch({ control, name: 'address.housenumber' })
  const postalCode = useWatch({ control, name: 'address.postalcode' })
  const city = useWatch({ control, name: 'address.city' })
  const country = useWatch({ control, name: 'address.countryId' })

  // KVK validation function
  const validateKvkNumber = async (kvkNumber: string, setValue?: any) => {
    if (!kvkNumber || kvkNumber.trim() === '') return

    setIsValidatingKvk(true)
    // Reset address lookup data and map state when trying KVK lookup
    setAddressLookupData(null)
    setShouldRenderMap(false)
    shouldRenderMapRef.current = false
    lastProcessedAddressRef.current = ''

    try {
      // Use the SWR API to fetch KVK data
      const response = await swrApi.fetch(`kvk/${kvkNumber}`)

      if (response.ok && response.data?.success && response.data?.data) {
        const companyData = response.data.data

        // Auto-populate form fields with API data
        if (setValue) {
          setValue('name', companyData.tradeNames[0] || '')
          setValue('address.streetname', companyData.legalAddress.streetName)
          setValue('address.postalcode', companyData.legalAddress.postalCode)
          setValue('address.housenumber', companyData.legalAddress.houseNumber)
          setValue('address.city', companyData.legalAddress.city)
          setValue('address.countryId', 1)
          setValue('chamberOfCommerceId', companyData.kvkNumber)

          if (companyData.sbiCodes && companyData.sbiCodes.length > 0) {
            setValue('sbiCodes', companyData.sbiCodes)
          }
        }

        setKvkValidationData({
          data: [companyData],
          success: true,
        })
      } else {
        // Clear all fields on KVK validation failure
        if (setValue) {
          setValue('name', '')
          setValue('address.streetname', '')
          setValue('address.postalcode', '')
          setValue('address.housenumber', '')
          setValue('address.city', '')
          setValue('address.countryId', 0)
          setValue('postalCodeHouse', '')
        }

        setKvkValidationData({
          data: [],
          success: false,
          message:
            response.data?.message ||
            'KVK number not found. Try using Postal Code + House Number lookup instead.',
        })
      }
    } catch (error) {
      // Clear all fields on error
      if (setValue) {
        setValue('name', '')
        setValue('address.streetname', '')
        setValue('address.postalcode', '')
        setValue('address.housenumber', '')
        setValue('address.city', '')
        setValue('postalCodeHouse', '')
      }

      setKvkValidationData({
        data: [],
        success: false,
        message: 'Error checking KVK. Please try Postal Code + House Number lookup instead.',
      })
    } finally {
      setIsValidatingKvk(false)
    }
  }

  // Handle Postal Code + House Number lookup
  const lookupAddress = async (postalCodeHouse: string, setValue?: any) => {
    if (!postalCodeHouse || postalCodeHouse.trim() === '') {
      return
    }

    setIsLookingUpAddress(true)
    // Reset map state when looking up new address
    setShouldRenderMap(false)
    shouldRenderMapRef.current = false
    lastProcessedAddressRef.current = ''

    try {
      // Use Google Places API for address lookup
      const response = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(postalCodeHouse)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data?.predictions && data.predictions.length > 0) {
        // Get the first prediction and fetch its details
        const placeId = data.predictions[0]?.place_id

        if (!placeId) {
          setAddressLookupData({ data: [], success: false })
          return
        }

        const detailsResponse = await fetch(`/api/places/details?placeId=${placeId}`)

        if (!detailsResponse.ok) {
          throw new Error(`HTTP error! status: ${detailsResponse.status}`)
        }

        const detailsData = await detailsResponse.json()

        if (detailsData?.result) {
          const result = detailsData.result
          const addressComponents = result.address_components || []

          // Extract address components with null checks
          const streetNumber =
            addressComponents.find((comp: any) => comp?.types?.includes('street_number'))
              ?.long_name || ''
          const route =
            addressComponents.find((comp: any) => comp?.types?.includes('route'))?.long_name || ''
          const postalCode =
            addressComponents.find((comp: any) => comp?.types?.includes('postal_code'))
              ?.long_name || ''
          const city =
            addressComponents.find((comp: any) => comp?.types?.includes('locality'))?.long_name ||
            ''
          const country =
            addressComponents.find((comp: any) => comp?.types?.includes('country'))?.long_name || ''

          // Auto-populate form fields
          if (setValue) {
            setValue('address.streetname', route)
            setValue('address.housenumber', streetNumber)
            setValue('address.postalcode', postalCode)
            setValue('address.city', city)

            // Map country name to countryId (Netherlands = 1, default to 1 for now)
            const countryId = country === 'Netherlands' ? 1 : 1
            setValue('address.countryId', countryId)

            // Set coordinates with null check
            if (result.geometry?.location?.lat && result.geometry?.location?.lng) {
              setValue('address.lat', result.geometry.location.lat.toString())
              setValue('address.lng', result.geometry.location.lng.toString())
              setValue('address.googleAddressId', placeId)
            }
          }

          setAddressLookupData({
            data: [
              {
                streetName: route,
                houseNumber: streetNumber,
                city: city,
                country: country,
                postalCode: postalCode,
              },
            ],
            success: true,
          })
        } else {
          setAddressLookupData({ data: [], success: false })
        }
      } else {
        setAddressLookupData({ data: [], success: false })
      }
    } catch (error) {
      console.error('Address lookup error:', error)
      setAddressLookupData({ data: [], success: false })
    } finally {
      setIsLookingUpAddress(false)
    }
  }

  // Handle map location selection
  const handleLocationSelect = (location: {
    address: string
    lat: number
    lng: number
    placeId: string
  }) => {
    setMapCoordinates({ lat: location.lat, lng: location.lng })
    setValue('address.lat', location.lat.toString())
    setValue('address.lng', location.lng.toString())
    setValue('address.googleAddressId', location.placeId)
  }

  // Handle KVK lookup
  const handleKvkValidation = async () => {
    if (kvkNumber) {
      await validateKvkNumber(kvkNumber, setValue)
    }
  }

  // Handle Postal Code + House Number lookup
  const handleAddressLookup = async () => {
    if (postalCodeHouse) {
      await lookupAddress(postalCodeHouse, setValue)
    }
  }

  // Format full address for the map
  const getFullAddress = (): string | undefined => {
    if (streetName && houseNumber && city) {
      const fullAddress = `${streetName} ${houseNumber}, ${postalCode || ''} ${city}`
      return fullAddress
    }
    return undefined
  }

  // Effect to control map rendering to prevent infinite API calls
  useEffect(() => {
    const currentAddress = getFullAddress()

    // Only update if we have a valid address and it's different from the last one
    if (currentAddress && currentAddress !== lastProcessedAddressRef.current) {
      lastProcessedAddressRef.current = currentAddress
      shouldRenderMapRef.current = true
      setShouldRenderMap(true)
    }
  }, [
    streetName,
    houseNumber,
    city,
    postalCode,
    country,
    lastProcessedAddressRef,
    shouldRenderMapRef,
    setShouldRenderMap,
  ])

  // Extract trade names from KVK data
  const kvkTradeNames =
    kvkValidationData?.success && kvkValidationData?.data?.[0]?.tradeNames
      ? kvkValidationData.data[0].tradeNames
      : []

  return {
    // Form state
    kvkNumber,
    postalCodeHouse,
    streetName,
    houseNumber,
    city,

    // KVK data
    kvkTradeNames,
    isKvkSuccess: kvkValidationData?.success || false,

    // Business partner form props
    isValidatingKvk,
    isLookingUpAddress,
    kvkValidationData,
    addressLookupData,
    shouldRenderMap,
    mapCoordinates,
    shouldRenderMapRef,
    lastProcessedAddressRef,

    // Actions
    handleKvkValidation,
    handleAddressLookup,
    handleLocationSelect,
  }
}
