import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personContactApi } from '@/services/api/person-contact-api'
import { usePersonContact } from '@/services/swr/use-person-contact'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/contact-form.schema'

export default function usePersonContactForm(personContactId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: personContact, isLoading } = usePersonContact(personContactId)

  const [inputType, setInputType] = useState<
    'endclientId' | 'businesspartnerId' | 'enterpriseRootId' | null
  >(null)

  const handleChange = (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => {
    setInputType(value)
    methods.setValue('inputType', value)
    methods.setValue('endclientId', null)
    methods.setValue('businesspartnerId', null)
    methods.setValue('enterpriseRootId', 0)
  }

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: personContact && {
      contactInfo: personContact.contactInfo,
      contactTypeId: personContact.contactTypeId,
      businesspartnerId: personContact.businesspartnerId,
      endclientId: personContact.endclientId,
      enterpriseRootId: personContact.enterpriseRootId,
      inputType: personContact.endclientId
        ? 'endclientId'
        : personContact.businesspartnerId
          ? 'businesspartnerId'
          : personContact.enterpriseRootId
            ? 'enterpriseRootId'
            : '',
    },
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
    const submitData = omitNullAndUndefined(data)
    if (personContactId) {
      return updatePersonContact(submitData)
    }

    return addPersonContact(submitData)
  }

  useEffect(() => {
    if (personContactId && inputType === null && !isLoading) {
      setInputType(
        methods.getValues('inputType') as 'endclientId' | 'businesspartnerId' | 'enterpriseRootId'
      )
      setTimeout(() => {
        methods.setValue('enterpriseRootId', personContact?.enterpriseRootId)
        methods.setValue('endclientId', personContact?.endclientId)
        methods.setValue('businesspartnerId', personContact?.businesspartnerId)
      }, 1000)
    }
  }, [methods.watch(), isLoading, personContactId])

  return { methods, inputType, onSubmit, handleChange, isLoading }
}
