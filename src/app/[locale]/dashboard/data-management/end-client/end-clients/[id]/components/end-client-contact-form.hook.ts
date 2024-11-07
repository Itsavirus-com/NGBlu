import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientContactApi } from '@/services/api/end-client-contact-api'
import { useEndClientContact } from '@/services/swr/use-end-client-contact'
import { InferType } from '@/utils/typescript'

export default function useEndClientContactForm(endCliendId: number, contactId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientContact } = useEndClientContact(endCliendId, contactId)

  const schema = yup.object().shape({
    personId: yup.number().required(),
    responsibilityId: yup.number().required(),
    contactInfoId: yup.number().required(),
    enterpriseRootId: yup.number().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientContact,
  })

  const addNewEndClientContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientContactApi.new(endCliendId, {
        ...data,
        endclientId: endCliendId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientContact = async (data: InferType<typeof schema>) => {
    if (!contactId) return

    try {
      const res = await endClientContactApi.update(endCliendId, contactId, {
        ...data,
        endclientId: endCliendId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (contactId) {
      return updateEndClientContact(data)
    }

    return addNewEndClientContact(data)
  }

  return { methods, onSubmit }
}
