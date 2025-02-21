import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootAddressApi } from '@/services/api/enterprise-root-address-api'
import { useEnterpriseRootAddress } from '@/services/swr/use-enterprise-root-address'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-address-form.schema'

export default function useEnterpriseRootAddressForm(addressId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: address,
    isLoading,
    mutate: invalidateCache,
  } = useEnterpriseRootAddress(Number(id), addressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: address && {
      addressId: address?.addressId ?? 0,
      addressTypeId: address?.addressTypeId ?? 0,
      ouUnitId: address?.ouUnitId ?? 0,
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
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (addressId) {
      return withLoading(() => updateEnterpriseRootAddress(submitData))
    }

    return withLoading(() => addNewEnterpriseRootAddress(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
