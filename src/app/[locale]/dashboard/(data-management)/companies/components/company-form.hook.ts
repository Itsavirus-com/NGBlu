/**
 * Custom hook for managing the company form, including adding and updating company details.
 *
 * @param {number} [companyId] - The ID of the company to edit. If not provided, the hook will handle creating a new company.
 *
 * @returns {Object} - The returned object contains:
 *   - `methods`: The form methods from `react-hook-form`, which include form state and handlers.
 *   - `onSubmit`: The function that handles form submission. It will either update an existing company or create a new one based on the presence of `companyId`.
 *
 * The hook utilizes `useForm` from `react-hook-form` and integrates with `yup` for form validation through the `yupResolver`.
 * It also manages the form state based on the provided `companyId` and updates the form values accordingly if the company exists.
 *
 * The hook calls `companyApi.new` to add a new company or `companyApi.update` to update an existing company. It also uses the `useToast` hook for displaying success and error messages.
 *
 * ### Example usage:
 *
 * ```tsx
 * const { methods, onSubmit } = useCompanyForm(companyId);
 *
 * return (
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *    * form fields here *
 *   </form>
 * );
 * ```
 */

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
    originId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: {
      companyname: company?.companyname ?? '',
      companyStatusId: company?.companyStatusId ?? 0,
      visitAddressId: company?.visitAddressId ?? 0,
      postalAddressId: company?.postalAddressId ?? 0,
      invoiceAddressId: company?.invoiceAddressId ?? 0,
      legalAddressId: company?.legalAddressId ?? 0,
      chamberOfCommerceId: company?.chamberOfCommerceId ?? '',
      vatNumber: company?.vatNumber ?? '',
      originId: company?.origin.id ?? 0,
    },
  })

  const addNewCompany = async (data: InferType<typeof schema>) => {
    const payload = {
      companyname: data.companyname,
      companyStatusId: data.companyStatusId,
      visitAddressId: data.visitAddressId,
      postalAddressId: data.postalAddressId,
      invoiceAddressId: data.invoiceAddressId,
      legalAddressId: data.legalAddressId,
      chamberOfCommerceId: data.chamberOfCommerceId,
      vatNumber: data.vatNumber,
      originId: data.originId,
    }

    try {
      const res = await companyApi.new(payload)

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
