import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientContactApi } from '@/services/api/end-client-contact-api'
import { useEndClientContact } from '@/services/swr/use-end-client-contact'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schema/end-client-contact-form.schema'

interface UseEndClientContactFormProps {
  endClientId: number
  contactId?: number
  enterpriseRootId: number
}

export default function useEndClientContactForm({
  endClientId,
  contactId,
  enterpriseRootId,
}: UseEndClientContactFormProps) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const {
    data: endClientContact,
    isLoading,
    mutate: invalidateCache,
  } = useEndClientContact(endClientId, contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientContact,
  })

  const addNewEndClientContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientContactApi.new(endClientId, {
        ...data,
        endclientId: endClientId,
        enterpriseRootId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientContact = async (data: InferType<typeof schema>) => {
    if (!contactId) return

    try {
      const res = await endClientContactApi.update(endClientId, contactId, {
        ...data,
        endclientId: endClientId,
        enterpriseRootId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
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
