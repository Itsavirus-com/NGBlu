import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personContactApi } from '@/services/api/person-contact-api'
import { usePersonContact } from '@/services/swr/use-person-contact'
import { InferType } from '@/utils/typescript'

export default function usePersonContactForm(personContactId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: personContact } = usePersonContact(personContactId)

  const schema = yup.object().shape({
    contactInfo: yup.string().ensure().required(),
    contactTypeId: yup.number().required(),
    enterpriseRootId: yup.number(),
    businesspartnerId: yup.number(),
    endclientId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: personContact,
  })

  const addPersonContact = async (data: InferType<typeof schema>) => {
    try {
      const res = await personContactApi.new({ ...data, personId: Number(id) })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Contact created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePersonContact = async (data: InferType<typeof schema>) => {
    if (!personContactId) return

    try {
      const res = await personContactApi.update(personContactId, { ...data, personId: Number(id) })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Contact updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (personContactId) {
      return updatePersonContact(data)
    }

    return addPersonContact(data)
  }

  return { methods, onSubmit }
}
