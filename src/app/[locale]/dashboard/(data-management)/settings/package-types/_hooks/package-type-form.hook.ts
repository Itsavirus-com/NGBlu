import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { packageTypeApi } from '@/services/api/package-type-api'
import { usePackageType } from '@/services/swr/use-package-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/package-type.schema'

export default function usePackageTypeForm(typeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: packageType, mutate: invalidateCache, isLoading } = usePackageType(typeId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: packageType && {
      name: packageType?.name ?? '',
    },
  })

  const addNewPackageType = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if ('name' in error.errors.detail) {
        showToast({ variant: 'danger', body: 'Package type already exists' })
        return
      }

      showUnexpectedToast()
    }
  }

  const updatePackageType = async (data: InferType<typeof schema>) => {
    if (!typeId) return

    try {
      const res = await packageTypeApi.update(typeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if ('name' in error.errors.detail) {
        showToast({ variant: 'danger', body: 'Package type already exists' })
        return
      }

      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (typeId) {
      return withLoading(() => updatePackageType(submitData))
    }

    return withLoading(() => addNewPackageType(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
