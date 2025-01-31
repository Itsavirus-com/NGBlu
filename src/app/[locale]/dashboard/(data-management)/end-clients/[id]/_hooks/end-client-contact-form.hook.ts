import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientContactApi } from '@/services/api/end-client-contact-api'
import { useEndClientContact } from '@/services/swr/use-end-client-contact'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/end-client-contact-form.schema'

export default function useEndClientContactForm(endClientId: number, contactId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientContact, isLoading } = useEndClientContact(endClientId, contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientContact,
  })

  const addNewEndClientContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientContactApi.new(endClientId, {
        ...data,
        endclientId: endClientId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact created successfully' })
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

  const updateEndClientContact = async (data: InferType<typeof schema>) => {
    if (!contactId) return

    try {
      const res = await endClientContactApi.update(endClientId, contactId, {
        ...data,
        endclientId: endClientId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact updated successfully' })
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
      return updateEndClientContact(submitData)
    }

    return addNewEndClientContact(submitData)
  }

  return { methods, onSubmit, isLoading }
}
