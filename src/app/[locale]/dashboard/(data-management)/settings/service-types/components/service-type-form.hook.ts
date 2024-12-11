import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { serviceTypeApi } from '@/services/api/service-type-api'
import { useServiceType } from '@/services/swr/use-service-type'
import { InferType } from '@/utils/typescript'

export default function useServiceTypeForm(typeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: serviceType } = useServiceType(typeId)

  const schema = yup.object().shape({
    serviceType: yup.string().ensure().required().max(45),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: serviceType,
  })

  const addNewServiceType = async (data: InferType<typeof schema>) => {
    try {
      const res = await serviceTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateServiceType = async (data: InferType<typeof schema>) => {
    if (!typeId) return

    try {
      const res = await serviceTypeApi.update(typeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (typeId) {
      return updateServiceType(data)
    }

    return addNewServiceType(data)
  }

  return { methods, onSubmit }
}
