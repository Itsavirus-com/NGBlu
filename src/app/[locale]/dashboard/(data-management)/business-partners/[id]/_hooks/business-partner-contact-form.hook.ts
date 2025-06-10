import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerContactApi } from '@/services/api/business-partner-contact-api'
import { useBusinessPartnerContact } from '@/services/swr/use-business-partner-contact'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner-contact-form.schema'

export const useBusinessPartnerContactForm = (businessPartnerId: number, contactId?: number) => {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: businessPartnerContact,
    isLoading,
    mutate: invalidateCache,
  } = useBusinessPartnerContact(businessPartnerId, contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartnerContact && {
      personId: businessPartnerContact?.person?.id ?? 0,
      contactInfoId: businessPartnerContact?.contactInfoId ?? 0,
      responsibilityId: businessPartnerContact?.responsibilityId ?? 0,
    },
  })

  const addNewBusinessPartnerContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerContactApi.new(businessPartnerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner contact created successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const updateBusinessPartnerContact = async (data: InferType<typeof schema>) => {
    if (!contactId) return

    try {
      const res = await businessPartnerContactApi.update(businessPartnerId, contactId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner contact updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (contactId) {
      return withLoading(() => updateBusinessPartnerContact(submitData))
    }

    return withLoading(() => addNewBusinessPartnerContact(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
