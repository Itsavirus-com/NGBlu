import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { packageServiceApi } from '@/services/api/package-service-api'
import { usePackageService } from '@/services/swr/use-package-service'
import { InferType } from '@/utils/typescript'

export default function usePackageServiceForm(id: number, packageServiceId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: serviceType } = usePackageService(Number(id), packageServiceId)

  const schema = yup.object().shape({
    packageId: yup.string().ensure().required(),
    serviceId: yup.string().ensure().required(),
    servicePricingConfigId: yup.string().ensure().required(),
  })

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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (packageServiceId) {
      return updatePackageService(data)
    }

    return addNewPackageService(data)
  }

  return { methods, onSubmit }
}
