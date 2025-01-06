import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerContactApi } from '@/services/api/business-partner-contact-api'
import { useBusinessPartnerContact } from '@/services/swr/use-business-partner-contact'
import { InferType } from '@/utils/typescript'

import { schema } from '../schemas/contact-form.schema'

export const useBusinessPartnerContactForm = (businessPartnerId: number, contactId?: number) => {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: businessPartnerContact } = useBusinessPartnerContact(businessPartnerId, contactId)

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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (contactId) {
      return updateBusinessPartnerContact(data)
    }

    return addNewBusinessPartnerContact(data)
  }

  return { methods, onSubmit }
}
