import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { packageServiceApi } from '@/services/api/package-service-api'
import { usePackageService } from '@/services/swr/use-package-service'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/package-service-form.schema'

export default function usePackageServiceForm(id: number, packageServiceId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: serviceType,
    isLoading,
    mutate: invalidateCache,
  } = usePackageService(Number(id), packageServiceId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: serviceType && {
      packageId: String(id),
      serviceId: serviceType?.serviceId ?? '',
      servicePricingConfigId: serviceType?.servicePricingConfigId ?? '',
    },
    defaultValues: {
      packageId: String(id),
      serviceId: '',
      servicePricingConfigId: '',
    },
  })

  const addNewPackageService = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageServiceApi.new(Number(id), data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package Service created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePackageService = async (data: InferType<typeof schema>) => {
    if (!packageServiceId) return

    try {
      const res = await packageServiceApi.update(Number(id), packageServiceId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package Service updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (packageServiceId) {
      return withLoading(() => updatePackageService(submitData))
    }

    return withLoading(() => addNewPackageService(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
