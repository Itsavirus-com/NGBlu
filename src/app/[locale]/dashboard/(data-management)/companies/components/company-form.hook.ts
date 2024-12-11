import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { companyApi } from '@/services/api/company-api'
import { useCompany } from '@/services/swr/use-company'
import { InferType } from '@/utils/typescript'

export default function useCompanyForm(companyId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: company } = useCompany(companyId)

  const schema = yup.object().shape({
    companyname: yup.string().ensure().required().max(255),
    companyStatusId: yup.number().required(),
    visitAddressId: yup.number().required(),
    postalAddressId: yup.number(),
    invoiceAddressId: yup.number().required(),
    legalAddressId: yup.number().required(),
    chamberOfCommerceId: yup.string().ensure().required(),
    vatNumber: yup.string().ensure(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: company,
  })

  const addNewCompany = async (data: InferType<typeof schema>) => {
    try {
      const res = await companyApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Company created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompany = async (data: InferType<typeof schema>) => {
    if (!companyId) return

    try {
      const res = await companyApi.update(companyId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Company updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (companyId) {
      return updateCompany(data)
    }

    return addNewCompany(data)
  }

  return { methods, onSubmit }
}
