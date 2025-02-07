import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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

  const {
    data: businessPartnerContact,
    isLoading,
    mutate,
  } = useBusinessPartnerContact(businessPartnerId, contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartnerContact && {
      personId: businessPartnerContact.person.id,
      contactInfoId: businessPartnerContact.contactInfoId,
      responsibilityId: businessPartnerContact.responsibilityId,
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
        mutate()
        back()
      }
    } catch (error: any) {
      if ('contactInfoId' in error?.errors?.detail) {
        showToast({ variant: 'danger', body: error?.errors?.detail?.contactInfoId })
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
        mutate()
        back()
      }
    } catch (error: any) {
      if ('contactInfoId' in error?.errors?.detail) {
        showToast({ variant: 'danger', body: error?.errors?.detail?.contactInfoId })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (contactId) {
      return updateBusinessPartnerContact(submitData)
    }

    return addNewBusinessPartnerContact(submitData)
  }

  return { methods, onSubmit, isLoading }
}
