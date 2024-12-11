import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootApi } from '@/services/api/enterprise-root-api'
import { useEnterpriseRoot } from '@/services/swr/use-enterprise-root'
import { InferType } from '@/utils/typescript'

export default function useEnterpriseRootForm(enterpriseRootId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: enterpriseRoot } = useEnterpriseRoot(enterpriseRootId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required().max(255),
    enterpriseRootAddressesId: yup.number().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: enterpriseRoot,
  })

  const addNewEnterpriseRoot = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEnterpriseRoot = async (data: InferType<typeof schema>) => {
    if (!enterpriseRootId) return

    try {
      const res = await enterpriseRootApi.update(enterpriseRootId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (enterpriseRootId) {
      return updateEnterpriseRoot(data)
    }

    return addNewEnterpriseRoot(data)
  }

  return { methods, onSubmit }
}
