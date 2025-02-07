import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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

  const { data: serviceType, isLoading, mutate } = usePackageService(Number(id), packageServiceId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: serviceType,
    defaultValues: {
      packageId: String(id),
    },
  })

  const addNewPackageService = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageServiceApi.new(Number(id), data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package Service created successfully' })
        mutate()
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
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (packageServiceId) {
      return updatePackageService(submitData)
    }

    return addNewPackageService(submitData)
  }

  return { methods, onSubmit, isLoading }
}
