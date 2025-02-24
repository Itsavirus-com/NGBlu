import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootContactApi } from '@/services/api/enterprise-root-contact-api'
import { useEnterpriseRootContact } from '@/services/swr/use-enterprise-root-contact'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-contact-form.schema'

export default function useEnterpriseRootContactForm(contactId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: contact,
    isLoading,
    mutate: invalidateCache,
  } = useEnterpriseRootContact(Number(id), contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: contact && {
      ouUnitId: contact?.ouUnitId,
      personId: contact?.personId,
      responsibilityId: contact?.responsibilityId,
      contactInfoId: contact?.contactInfoId,
    },
  })

  const addNewEnterpriseRootContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootContactApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root contact created successfully' })
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

  const updateEnterpriseRootContact = async (data: InferType<typeof schema>) => {
    if (!contactId) return

    try {
      const res = await enterpriseRootContactApi.update(Number(id), contactId, {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root contact updated successfully' })
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

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (contactId) {
      return withLoading(() => updateEnterpriseRootContact(submitData))
    }

    return withLoading(() => addNewEnterpriseRootContact(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
