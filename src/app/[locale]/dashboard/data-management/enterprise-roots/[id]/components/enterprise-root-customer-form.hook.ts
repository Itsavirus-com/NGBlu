import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootCustomerApi } from '@/services/api/enterprise-root-customer-api'
import { useEnterpriseRootCustomer } from '@/services/swr/use-enterprise-root-customer'
import { InferType } from '@/utils/typescript'

export default function useEnterpriseRootCustomerForm(customerId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: customer } = useEnterpriseRootCustomer(Number(id), customerId)

  const schema = yup.object().shape({
    endclientId: yup.number().required(),
    enterpriseRootAddressesId: yup.number().required(),
    ouUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: customer,
  })

  const addNewEnterpriseRootCustomer = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootCustomerApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root customer created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEnterpriseRootCustomer = async (data: InferType<typeof schema>) => {
    if (!customerId) return

    try {
      const res = await enterpriseRootCustomerApi.update(Number(id), customerId, {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root customer updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (customerId) {
      return updateEnterpriseRootCustomer(data)
    }

    return addNewEnterpriseRootCustomer(data)
  }

  return { methods, onSubmit }
}
