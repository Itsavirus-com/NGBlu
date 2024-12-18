import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientApi } from '@/services/api/end-client-api'
import { useEndClient } from '@/services/swr/use-end-client'
import { InferType } from '@/utils/typescript'

export default function useEndClientForm(id?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClient } = useEndClient(id)

  const schema = yup.object().shape({
    name: yup.string().ensure().required().max(255),
    typeId: yup.number().required(),
    statusId: yup.number().required(),
    locationAddressId: yup.number().required(),
    contactPersonId: yup.number(),
    accountNumber: yup.string().ensure().max(45),
    referenceId: yup.string(),
    personId: yup.number(),
    afasId: yup.string().ensure().max(45),
    companyInfoId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: {
      name: endClient?.name ?? '',
      typeId: endClient?.typeId ?? 0,
      statusId: endClient?.statusId ?? 0,
      locationAddressId: endClient?.locationAddressId ?? 0,
      contactPersonId: endClient?.contactPersonId ?? 0,
      accountNumber: endClient?.accountNumber ?? '',
      referenceId: endClient?.referenceId ?? '',
      personId: endClient?.personId ?? 0,
      afasId: endClient?.afasId ?? '',
      companyInfoId: endClient?.companyInfoId ?? 0,
    },
  })

  const addNewEndClient = async (data: InferType<typeof schema>) => {
    const payload = {
      name: data.name,
      typeId: data.typeId,
      statusId: data.statusId,
      locationAddressId: data.locationAddressId,
      contactPersonId: data.contactPersonId,
      accountNumber: data.accountNumber,
      referenceId: data.referenceId,
      personId: data.personId,
      afasId: data.afasId,
      companyInfoId: data.companyInfoId,
    }

    try {
      const res = await endClientApi.new(payload)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClient = async (data: InferType<typeof schema>) => {
    if (!id) return

    const payload = {
      name: data.name,
      typeId: data.typeId,
      statusId: data.statusId,
      locationAddressId: data.locationAddressId,
      contactPersonId: data.contactPersonId,
      accountNumber: data.accountNumber,
      referenceId: data.referenceId,
      personId: data.personId,
      afasId: data.afasId,
      companyInfoId: data.companyInfoId,
    }

    try {
      const res = await endClientApi.update(id, payload)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (id) {
      return updateEndClient(data)
    }

    return addNewEndClient(data)
  }

  return { methods, onSubmit }
}
