import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { packageApi } from '@/services/api/package-api'
import { usePackage } from '@/services/swr/use-package'
import { InferType } from '@/utils/typescript'

export default function usePackageForm(packageId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: packageData } = usePackage(packageId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    packageTypeId: yup.number().required(),
    priceConfigId: yup.number().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: packageData,
  })

  const addNewPackage = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package created successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePackage = async (data: InferType<typeof schema>) => {
    if (!packageId) return

    try {
      const res = await packageApi.update(packageId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package updated successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (packageId) {
      return updatePackage(data)
    }

    return addNewPackage(data)
  }

  return { methods, onSubmit }
}
