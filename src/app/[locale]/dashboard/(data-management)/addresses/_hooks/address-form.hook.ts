import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AddressSuggestion } from '@/components/google-map/google-map.type'
import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { addressApi } from '@/services/api/address-api'
import { useAddress } from '@/services/swr/use-address'
import { useOptionData } from '@/services/swr/use-option-data'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/address-form.schema'

export default function useAddressForm(addressId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()
  const t = useTranslations('dataManagement.addresses')

  const { data: address, isLoading, mutate: invalidateCache } = useAddress(addressId)
  const { data: countryList } = useOptionData('countries')

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      countryId: 1,
    },
    values: address && {
      addressName: address?.addressName ?? '',
      streetname: address?.streetname ?? '',
      housenumber: address?.housenumber ?? '',
      housenumberSuffix: address?.housenumberSuffix ?? '',
      appartmentNumber: address?.appartmentNumber ?? '',
      area: address?.area ?? '',
      county: address?.county ?? '',
      city: address?.city ?? '',
      postalcode: address?.postalcode ?? '',
      countryId: address?.countryId ?? 1,
      lat: address?.lat ?? '',
      lng: address?.lng ?? '',
      googleAddressId: address?.googleAddressId ?? '',
    },
    context: {
      t,
    },
  })

  // Watch all relevant address fields
  const streetName = methods.watch('streetname')
  const houseNumber = methods.watch('housenumber')
  const houseNumberSuffix = methods.watch('housenumberSuffix')
  const apartmentNumber = methods.watch('appartmentNumber')
  const postalCode = methods.watch('postalcode')
  const city = methods.watch('city')
  const area = methods.watch('area')
  const countryId = methods.watch('countryId')
  const selectedCountry = countryList?.find(country => country.id === countryId)

  // Add state to track map coordinates from address selection
  const [selectedMapCoords, setSelectedMapCoords] = useState<{ lat: number; lng: number } | null>(
    null
  )

  // Enhanced function to handle address selection from Google Autocomplete
  const handleAddressSelect = (place: AddressSuggestion) => {
    if (!place) return

    const lat = place.latitude || 0
    const lng = place.longitude || 0

    // Set coordinates with proper decimal places (based on schema field names)
    methods.setValue('lat', lat.toFixed(9))
    methods.setValue('lng', lng.toFixed(9))
    methods.setValue('googleAddressId', place.placeId)

    // Update the map coordinates when an address is selected
    setSelectedMapCoords({ lat, lng })

    // If we're handling a specific field and fieldName is provided, update that field directly
    if (place.fieldName) {
      // When fieldName is provided but street is null, use the mainText or description
      const streetValue = place.street || place.mainText || place.description || ''
      methods.setValue(place.fieldName as keyof InferType<typeof schema>, streetValue)
    } else {
      // Update all address fields with data from the suggestion
      // When street is null, use mainText as a fallback for street name
      const streetValue = place.street || place.mainText || place.description || ''
      methods.setValue('streetname', streetValue)
    }

    // Set other address components based on schema field names
    if (place.streetNumber) {
      methods.setValue('housenumber', place.streetNumber)
    }

    if (place.subpremise) {
      methods.setValue('housenumberSuffix', place.subpremise)
      // If subpremise exists, it could also be an apartment number
      methods.setValue('appartmentNumber', place.subpremise)
    }

    if (place.postalCode) {
      methods.setValue('postalcode', place.postalCode)
    }

    if (place.city) {
      methods.setValue('city', place.city)
    }

    if (place.country && countryList) {
      // Find country ID by name
      const country = countryList.find(c => c.name.toLowerCase() === place.country?.toLowerCase())
      if (country) {
        methods.setValue('countryId', country.id)
      }
    }
  }

  // Combine the original map coordinates with any selected coordinates
  const displayMapCoordinates = useMemo(() => {
    if (selectedMapCoords) {
      return selectedMapCoords
    }

    return {
      lat: parseFloat(address?.lat || '0'),
      lng: parseFloat(address?.lng || '0'),
    }
  }, [selectedMapCoords, address])

  const addNewAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await addressApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address created successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.errors?.detail && 'lat' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if (error?.errors?.detail && 'lng' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid longitude' })
      }
      showUnexpectedToast()
    }
  }

  const updateAddress = async (data: InferType<typeof schema>) => {
    if (!addressId) return

    try {
      const res = await addressApi.update(addressId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.errors?.detail && 'lat' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if (error?.errors?.detail && 'lng' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid longitude' })
      }
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (addressId) {
      return withLoading(() => updateAddress(submitData))
    }

    return withLoading(() => addNewAddress(submitData))
  }

  return {
    methods,
    onSubmit,
    isLoading,
    isSubmitting,
    displayMapCoordinates,
    handleAddressSelect,
    selectedMapCoords,
    setSelectedMapCoords,
  }
}
