import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personApi } from '@/services/api/person-api'
import { usePerson } from '@/services/swr/use-person'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/person-form.schema'

export default function usePersonForm(personId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: person } = usePerson(personId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: person && {
      firstname: person.firstname ?? '',
      lastname: person.lastname ?? '',
      pronounce: person.pronounce ?? '',
      namePrefix: person.namePrefix ?? '',
      nameSuffix: person.nameSuffix ?? '',
      genderId: person.genderId ?? null,
      personTypeId: person.personTypeId ?? 0,
      titles: person.titles ?? '',
      salutation: person.salutation ?? '',
      department: person.department ?? '',
    },
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
    const submitData = omitNullAndUndefined(data)

    if (personId) {
      return updatePerson(submitData)
    }

    return addNewPerson(submitData)
  }

  return { methods, onSubmit }
}
