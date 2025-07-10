'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { useBusinessPartnerForm } from './business-partner.hook'
import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useBusinessProfileForm = () => {
  const {
    validateKvkNumber,
    lookupAddress,
    handleLocationSelect,
    isValidatingKvk,
    isLookingUpAddress,
    kvkValidationData,
    addressLookupData,
    shouldRenderMap,
    shouldRenderMapRef,
    lastProcessedAddressRef,
    mapCoordinates,
    setShouldRenderMap,
  } = useBusinessPartnerForm()

  const { control } = useFormContext<CreateBusinessPartnerFormData>()

  // Watch field values - Address fields
  const kvkNumber = useWatch({ control, name: 'kvkNumber' })
  const companyName = useWatch({ control, name: 'companyName' })
  const postalCodeHouse = useWatch({ control, name: 'postalCodeHouse' })
  const streetName = useWatch({ control, name: 'streetName' })
  const houseNumber = useWatch({ control, name: 'houseNumber' })
  const postalCode = useWatch({ control, name: 'postalCode' })
  const city = useWatch({ control, name: 'city' })
  const country = useWatch({ control, name: 'country' })

  // Handle KVK lookup
  const handleKvkValidation = async () => {
    if (kvkNumber) {
      await validateKvkNumber(kvkNumber)
    }
  }

  // Handle Postal Code + House Number lookup
  const handleAddressLookup = async () => {
    if (postalCodeHouse) {
      await lookupAddress(postalCodeHouse)
    }
  }

  // Format full address for the map
  const getFullAddress = (): string | undefined => {
    if (streetName && houseNumber && city) {
      const fullAddress = `${streetName} ${houseNumber}, ${postalCode || ''} ${city}, ${country || ''}`
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

  // Determine whether to show manual fields or KVK retrieved data
  const showManualFields = !kvkNumber || kvkNumber.trim() === ''

  return {
    // Form state
    kvkNumber,
    companyName,
    postalCodeHouse,
    streetName,
    houseNumber,
    postalCode,
    city,
    country,

    // Business partner form props
    isValidatingKvk,
    isLookingUpAddress,
    kvkValidationData,
    addressLookupData,
    shouldRenderMap,
    mapCoordinates,
    lastProcessedAddressRef,

    // Actions
    handleKvkValidation,
    handleAddressLookup,
    handleLocationSelect,

    // Helpers
    getFullAddress,
    showManualFields,
  }
}
