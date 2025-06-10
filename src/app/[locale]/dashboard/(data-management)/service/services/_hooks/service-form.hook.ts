import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { serviceApi } from '@/services/api/service-api'
import { useService } from '@/services/swr/use-service'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/service-form.schema'

export default function useServiceForm(serviceId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: service, isLoading, mutate: invalidateCache } = useService(serviceId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: service && {
      name: service?.name ?? '',
      description: service?.description ?? '',
      serviceTypeId: service?.serviceTypeId ?? 0,
      inputType: service?.corporateOnlyService
        ? 'corporateOnlyService'
        : service?.consumerOnlyService
          ? 'consumerOnlyService'
          : '',
    },
  })

  const handleChange = (value: 'corporateOnlyService' | 'consumerOnlyService') => {
    methods.setValue('inputType', value)
  }

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
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
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
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (serviceId) {
      return withLoading(() => updateService(submitData))
    }

    return withLoading(() => addNewService(submitData))
  }

  return { methods, onSubmit, isLoading, handleChange, isSubmitting }
}
