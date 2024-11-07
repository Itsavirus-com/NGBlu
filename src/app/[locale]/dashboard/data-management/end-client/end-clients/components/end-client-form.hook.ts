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
    name: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClient,
  })

  const addNewEndClient = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientApi.new(data)

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

    try {
      const res = await endClientApi.update(id, data)

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
