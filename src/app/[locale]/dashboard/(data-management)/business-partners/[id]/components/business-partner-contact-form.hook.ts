import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerContactApi } from '@/services/api/business-partner-contact-api'
import { useBusinessPartnerContact } from '@/services/swr/use-business-partner-contact'
import { InferType } from '@/utils/typescript'

export const useBusinessPartnerContactForm = (businessPartnerId: number, contactId?: number) => {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: businessPartnerContact } = useBusinessPartnerContact(businessPartnerId, contactId)

  const schema = yup.object().shape({
    personId: yup.number().required(),
    contactInfoId: yup.number().required(),
    enterpriseRootId: yup.number().required(),
    responsibilityId: yup.number().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartnerContact && {
      ...businessPartnerContact,
      personId: businessPartnerContact.person.id,
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
