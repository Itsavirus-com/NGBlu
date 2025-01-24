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

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { companyApi } from '@/services/api/company-api'
import { useCompany } from '@/services/swr/use-company'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/company-form.schema'

export default function useCompanyForm(companyId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: company, isLoading } = useCompany(companyId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: {
      companyname: company?.companyname!,
      companyStatusId: company?.companyStatusId!,
      visitAddressId: company?.visitAddressId!,
      postalAddressId: company?.postalAddressId,
      invoiceAddressId: company?.invoiceAddressId!,
      legalAddressId: company?.legalAddressId!,
      chamberOfCommerceId: company?.chamberOfCommerceId!,
      vatNumber: company?.vatNumber!,
      originId: company?.origin?.id,
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
    const submitData = omitNullAndUndefined(data)

    if (companyId) {
      return updateCompany(submitData)
    }

    return addNewCompany(submitData)
  }

  return { methods, onSubmit, isLoading }
}
