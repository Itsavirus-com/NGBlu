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
    addressName: yup.string().ensure().required(),
    streetname: yup.string().ensure().required(),
    housenumber: yup.string().ensure().required(),
    housenumberSuffix: yup.string().ensure().required(),
    appartmentNumber: yup.string().ensure().required(),
    area: yup.string().ensure().required(),
    county: yup.string().ensure().required(),
    city: yup.string().ensure().required(),
    postalcode: yup.string().ensure().required(),
    countryId: yup.number().required(),
    lat: yup.string().ensure().required().min(-90).max(90),
    lng: yup.string().ensure().required().min(-180).max(180),
    googleAddressId: yup.string().ensure().required(),
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
    } catch (error) {
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
    } catch (error) {
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
