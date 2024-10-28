import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { contactTypeApi } from '@/services/api/contact-type-api'
import { useContactType } from '@/services/swr/use-contact-type'
import { InferType } from '@/utils/typescript'

export default function useContactTypeForm(contactTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: contactType } = useContactType(contactTypeId)

  const schema = yup.object().shape({
    contactType: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: contactType,
  })

  const addNewContactType = async (data: InferType<typeof schema>) => {
    try {
      const res = await contactTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Contact type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateContactType = async (data: InferType<typeof schema>) => {
    if (!contactTypeId) return

    try {
      const res = await contactTypeApi.update(contactTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Contact type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (contactTypeId) {
      return updateContactType(data)
    }

    return addNewContactType(data)
  }

  return { methods, onSubmit }
}
