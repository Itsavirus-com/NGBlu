import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { serviceApi } from '@/services/api/service-api'
import { useService } from '@/services/swr/use-service'
import { InferType } from '@/utils/typescript'

export default function useServiceForm(serviceId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: service } = useService(serviceId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    description: yup.string().ensure().required(),
    serviceTypeId: yup.number().required(),
    corporateOnlyService: yup.boolean().required(),
    consumerOnlyService: yup.boolean().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: service,
  })

  const addNewService = async (data: InferType<typeof schema>) => {
    try {
      let newData = {
        ...data,
        corporateOnlyService: data.corporateOnlyService ? 1 : 0,
        consumerOnlyService: data.consumerOnlyService ? 1 : 0,
      }
      const res = await serviceApi.new(newData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service created successfully' })
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
        corporateOnlyService: data.corporateOnlyService ? 1 : 0,
        consumerOnlyService: data.consumerOnlyService ? 1 : 0,
      }
      console.log(newData)
      const res = await serviceApi.update(serviceId, newData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service updated successfully' })
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

  return { methods, onSubmit }
}
