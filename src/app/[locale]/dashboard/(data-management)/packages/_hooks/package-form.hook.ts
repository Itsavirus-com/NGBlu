import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { packageApi } from '@/services/api/package-api'
import { usePackage } from '@/services/swr/use-package'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/package-form.schema'

export default function usePackageForm(packageId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: packageData, isLoading, mutate: invalidateCache } = usePackage(packageId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: packageData,
  })

  const addNewPackage = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package created successfully' })
        invalidateCache()
        back()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (packageId) {
      return updatePackage(submitData)
    }

    return addNewPackage(submitData)
  }

  return { methods, onSubmit, isLoading }
}
