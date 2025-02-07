import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootAddressApi } from '@/services/api/enterprise-root-address-api'
import { useEnterpriseRootAddress } from '@/services/swr/use-enterprise-root-address'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-address-form.schema'

export default function useEnterpriseRootAddressForm(addressId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: address, mutate } = useEnterpriseRootAddress(Number(id), addressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: address && {
      addressId: address.addressId,
      addressTypeId: address.addressTypeId,
      ouUnitId: address.ouUnitId,
    },
  })

  const addNewEnterpriseRootAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootAddressApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root address created successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEnterpriseRootAddress = async (data: InferType<typeof schema>) => {
    if (!addressId) return

    try {
      const res = await enterpriseRootAddressApi.update(Number(id), addressId, {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root address updated successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (addressId) {
      return updateEnterpriseRootAddress(data)
    }

    return addNewEnterpriseRootAddress(data)
  }

  return { methods, onSubmit }
}
