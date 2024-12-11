import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { addressApi } from '@/services/api/address-api'
import { useAddress } from '@/services/swr/use-address'
import { InferType } from '@/utils/typescript'

export default function useAddressForm(addressId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: address } = useAddress(addressId)

  const schema = yup.object().shape({
    addressName: yup.string().ensure().max(255),
    streetname: yup.string().ensure().required().max(255),
    housenumber: yup.string().ensure().max(45),
    housenumberSuffix: yup.string().ensure().max(45),
    appartmentNumber: yup.string().ensure().max(45),
    area: yup.string().ensure().max(255),
    county: yup.string().ensure().max(255),
    city: yup.string().ensure().required().max(255),
    postalcode: yup.string().ensure().required().max(45),
    countryId: yup.number().required(),
    lat: yup.string().ensure().min(-90).max(90),
    lng: yup.string().ensure().min(-180).max(180),
    googleAddressId: yup.string().ensure().max(150),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: address,
  })

  const addNewAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await addressApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address created successfully' })
        back()
      }
    } catch (error: any) {
      if ('lat' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if ('lng' in error.errors.detail) {
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
      if ('lat' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if ('lng' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid longitude' })
      }
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (addressId) {
      return updateAddress(data)
    }

    return addNewAddress(data)
  }

  return { methods, onSubmit }
}
