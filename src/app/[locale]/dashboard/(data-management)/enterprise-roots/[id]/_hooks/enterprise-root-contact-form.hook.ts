import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootContactApi } from '@/services/api/enterprise-root-contact-api'
import { useEnterpriseRootContact } from '@/services/swr/use-enterprise-root-contact'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-contact-form.schema'

export default function useEnterpriseRootContactForm(contactId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: contact } = useEnterpriseRootContact(Number(id), contactId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: contact,
  })

  const addNewEnterpriseRootContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootContactApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root contact created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (contactId) {
      return updateEnterpriseRootContact(data)
    }

    return addNewEnterpriseRootContact(data)
  }

  return { methods, onSubmit }
}
