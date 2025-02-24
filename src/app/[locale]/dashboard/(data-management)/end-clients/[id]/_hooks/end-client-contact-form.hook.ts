import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
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
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: endClientContact,
    isLoading,
    mutate: invalidateCache,
  } = useEndClientContact(endClientId, contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientContact && {
      personId: endClientContact?.personId ?? null,
      responsibilityId: endClientContact?.responsibilityId ?? null,
      contactInfoId: endClientContact?.contactInfoId ?? null,
    },
  })

  const addNewEndClientContact = async (data: InferType<typeof schema>) => {
    try {
      const submitData = {
        ...data,
        endclientId: endClientId,
      }

      const res = await endClientContactApi.new(endClientId, submitData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact created successfully' })
        invalidateCache()
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
      const submitData = {
        ...data,
        endclientId: endClientId,
      }

      const res = await endClientContactApi.update(endClientId, contactId, submitData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact updated successfully' })
        invalidateCache()
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
      return withLoading(() => updateEndClientContact(submitData))
    }

    return withLoading(() => addNewEndClientContact(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
