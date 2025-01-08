import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { serviceApi } from '@/services/api/service-api'
import { useService } from '@/services/swr/use-service'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/service-form.schema'

export default function useServiceForm(serviceId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: service, isLoading } = useService(serviceId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: service && {
      ...service,
      inputType: service.corporateOnlyService
        ? 'corporateOnlyService'
        : service.consumerOnlyService
          ? 'consumerOnlyService'
          : '',
    },
  })

  const addNewService = async (data: InferType<typeof schema>) => {
    try {
      let newData = {
        ...data,
        corporateOnlyService: data.inputType === 'corporateOnlyService' ? '1' : '0',
        consumerOnlyService: data.inputType === 'consumerOnlyService' ? '1' : '0',
      }
      const res = await serviceApi.new(newData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateService = async (data: InferType<typeof schema>) => {
    if (!serviceId) return

    try {
      let newData = {
        ...data,
        corporateOnlyService: data.inputType === 'corporateOnlyService' ? '1' : '0',
        consumerOnlyService: data.inputType === 'consumerOnlyService' ? '1' : '0',
      }
      const res = await serviceApi.update(serviceId, newData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (serviceId) {
      return updateService(data)
    }

    return addNewService(data)
  }

  return { methods, onSubmit, isLoading }
}
