import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personApi } from '@/services/api/person-api'
import { usePerson } from '@/services/swr/use-person'
import { InferType } from '@/utils/typescript'

export default function usePersonForm(personId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: person } = usePerson(personId)

  const schema = yup.object().shape({
    firstname: yup.string().ensure().required().max(45),
    lastname: yup.string().ensure().max(45),
    pronounce: yup.string().ensure().max(45),
    namePrefix: yup.string().ensure().max(45),
    nameSuffix: yup.string().ensure().max(45),
    genderId: yup.number(),
    personTypeId: yup.number().required(),
    titles: yup.string().ensure().max(45),
    salutation: yup.string().ensure().max(45),
    department: yup.string().ensure().max(45),
    role: yup.string().ensure().max(45),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: person,
  })

  const addNewPerson = async (data: InferType<typeof schema>) => {
    try {
      const res = await personApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Person created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePerson = async (data: InferType<typeof schema>) => {
    if (!personId) return

    try {
      const res = await personApi.update(personId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Person updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (personId) {
      return updatePerson(data)
    }

    return addNewPerson(data)
  }

  return { methods, onSubmit }
}
