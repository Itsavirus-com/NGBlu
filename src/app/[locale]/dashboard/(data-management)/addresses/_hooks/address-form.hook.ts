import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

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
  const t = useTranslations('dataManagement.addresses')

  const { data: address, isLoading } = useAddress(addressId)
  const { data: countryList } = useOptionData('countries')

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      countryId: 1,
    },
    values: address && {
      addressName: address.addressName,
      streetname: address.streetname,
      housenumber: address.housenumber,
      housenumberSuffix: address.housenumberSuffix,
      appartmentNumber: address.appartmentNumber,
      area: address.area,
      county: address.county,
      city: address.city,
      postalcode: address.postalcode,
      countryId: address.countryId,
      lat: address.lat,
      lng: address.lng,
      googleAddressId: address.googleAddressId,
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

  // Combine address fields into a single string
  const getFormattedAddress = () => {
    const houseNumberPart =
      houseNumber && houseNumberSuffix ? `${houseNumber}${houseNumberSuffix}` : houseNumber

    const addressParts = [
      streetName,
      houseNumberPart,
      apartmentNumber ? `Apt ${apartmentNumber}` : null,
      area,
      city,
      selectedCountry?.name,
      postalCode,
    ].filter(Boolean) // Remove empty values

    return addressParts.join(', ')
  }

  // Handle location selection from map
  const handleLocationSelect = ({
    lat,
    lng,
    placeId,
  }: {
    address: string
    lat: number
    lng: number
    placeId: string
  }) => {
    methods.setValue('lat', lat.toString())
    methods.setValue('lng', lng.toString())
    methods.setValue('googleAddressId', placeId)
  }

  const addNewAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await addressApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address created successfully' })
        back()
      }
    } catch (error: any) {
      if ('lat' in error?.errors?.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if ('lng' in error?.errors?.detail) {
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
        back()
      }
    } catch (error: any) {
      if ('lat' in error?.errors?.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if ('lng' in error?.errors?.detail) {
        return showToast({ variant: 'danger', body: 'Invalid longitude' })
      }
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (addressId) {
      return updateAddress(submitData)
    }

    return addNewAddress(submitData)
  }

  return { methods, onSubmit, isLoading, getFormattedAddress, handleLocationSelect }
}
