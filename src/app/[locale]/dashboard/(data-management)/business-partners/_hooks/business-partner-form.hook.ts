/**
 * Custom hook for managing a business partner form, allowing both creation and updating of business partner data.
 *
 * This hook manages the form initialization, validation, and submission logic. It integrates with `react-hook-form`
 * for form state management and uses `yup` for validation. It supports adding a new business partner or updating an
 * existing business partner based on whether the `id` is provided.
 *
 * @param {number} [id] - The ID of the business partner to update. If no `id` is provided, the hook will handle
 * creating a new business partner.
 *
 * @returns {Object} The returned object contains:
 *   - `methods`: An object containing the form methods from `react-hook-form` (`handleSubmit`, `register`, etc.).
 *   - `onSubmit`: A function that handles the form submission. If `id` is provided, it updates the business partner;
 *     otherwise, it creates a new business partner.
 *
 * The hook performs the following actions:
 * - Sets the initial form values based on the provided business partner data if `id` exists.
 * - Calls `businessPartnerApi.new` to create a new business partner or `businessPartnerApi.update` to update an
 *   existing business partner.
 * - Utilizes `useToast` for displaying success or error messages, including handling a specific error when a business
 *   partner name already exists.
 *
 * ### Example usage:
 *
 * ```tsx
 * const { methods, onSubmit } = useBusinessPartnerForm(id);
 *
 * return (
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *      form fields here
 *   </form>
 * );
 * ```
 *
 * ### Form Validation:
 * - The form is validated using a `yup` schema, ensuring that all required fields are filled out correctly before submission.
 *
 * ### Fields:
 * - `name`: The name of the business partner (required, max length 255).
 * - `businesspartnerTypeId`: The business partner type ID (required).
 * - `companyInfoId`: The company information ID (required).
 * - `enterpriseRootId`: The enterprise root ID (required).
 * - `businesspartnersAddressesId`: The business partner's address ID (required).
 * - `ouUnit`: The organizational unit ID (optional).
 * - `parentId`: The parent ID of the business partner (optional).
 *
 * ### Error Handling:
 * - If the business partner name already exists, a specific error message is shown.
 * - For any other errors, an unexpected error message is shown.
 */

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerApi } from '@/services/api/business-partner-api'
import { useBusinessPartner } from '@/services/swr/use-business-partner'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner.schema'

export default function useBusinessPartnerForm(id?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: businessPartner, isLoading } = useBusinessPartner(id)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartner && {
      ...businessPartner,
      businesspartnerTypeId: businessPartner.businessPartnerType.id,
      companyInfoId: businessPartner.companyInfo.id,
      parentId: businessPartner?.parent?.id,
      ouUnitId: businessPartner?.ouUnitId,
    },
  })

  const enterpriseRootIdValue = methods.watch('enterpriseRootId')

  const addNewBusinessPartner = async (data: InferType<typeof schema>) => {
    const payload = {
      name: data.name,
      businesspartnerTypeId: data.businesspartnerTypeId,
      businesspartnersAddressesId: data.businesspartnersAddressesId,
      companyInfoId: data.companyInfoId,
      ouUnitId: data.ouUnitId,
      enterpriseRootId: data.enterpriseRootId,
      parentId: data.parentId,
    }

    try {
      const res = await businessPartnerApi.new(payload)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner created successfully' })
        back()
      }
    } catch (error: any) {
      if ('name' in error.errors.detail) {
        showToast({ variant: 'danger', body: 'Business partner name is already exists' })
        return
      }
      showUnexpectedToast()
    }
  }

  const updateBusinessPartner = async (data: InferType<typeof schema>) => {
    if (!id) return

    const payload = {
      name: data.name,
      businesspartnerTypeId: data.businesspartnerTypeId,
      businesspartnersAddressesId: data.businesspartnersAddressesId,
      companyInfoId: data.companyInfoId,
      ouUnitId: data.ouUnitId,
      enterpriseRootId: data.enterpriseRootId,
      parentId: data.parentId,
    }

    try {
      const res = await businessPartnerApi.update(id, payload)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner updated successfully' })
        back()
      }
    } catch (error: any) {
      if ('name' in error.errors.detail) {
        showToast({ variant: 'danger', body: 'Business partner name is already exists' })
        return
      }
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (id) {
      return updateBusinessPartner(submitData)
    }

    return addNewBusinessPartner(submitData)
  }

  return { methods, onSubmit, isLoading, enterpriseRootIdValue }
}
