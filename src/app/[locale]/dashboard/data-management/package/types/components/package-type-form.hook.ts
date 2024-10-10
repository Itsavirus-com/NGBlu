import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { packageTypeApi } from '@/services/api/package-api'
import { usePackageType } from '@/services/swr/use-package-type'
import { InferType } from '@/utils/typescript'

export default function usePackageTypeForm(typeId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: packageType } = usePackageType(typeId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: packageType,
  })

  const addNewPackageType = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package type created successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePackageType = async (data: InferType<typeof schema>) => {
    if (!typeId) return

    try {
      const res = await packageTypeApi.update(typeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package type updated successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (typeId) {
      return updatePackageType(data)
    }

    return addNewPackageType(data)
  }

  return { methods, onSubmit }
}
