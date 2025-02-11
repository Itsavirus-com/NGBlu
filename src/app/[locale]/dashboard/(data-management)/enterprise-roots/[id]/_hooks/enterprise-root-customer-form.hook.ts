/**
 * useEnterpriseRootForm Hook
 *
 * A custom React hook to manage the form logic for creating or updating an enterprise root.
 * This hook integrates with `react-hook-form` for form handling and `yup` for schema validation.
 *
 * Features:
 * - Schema-based validation using `yup`
 * - Handles form submission for both creating and updating enterprise roots
 * - Fetches initial data for updates and populates the form fields
 * - Provides toast notifications for success and error scenarios
 * - Navigates back to the previous page upon successful operation
 *
 * Dependencies:
 * - `@hookform/resolvers/yup`: For integrating yup schema with react-hook-form
 * - `react-hook-form`: For managing form state
 * - `yup`: For schema validation
 * - `@/hooks/use-toast.hook`: For showing toast notifications
 * - `@/navigation`: For navigating between routes
 * - `@/services/api/enterprise-root-api`: API service for managing enterprise roots
 * - `@/services/swr/use-enterprise-root`: SWR hook for fetching enterprise root data
 * - `@/utils/typescript`: Utility for inferring TypeScript types
 *
 * @param {number} [enterpriseRootId] - Optional ID of the enterprise root for editing
 * @returns {object} - Form methods and submit handler
 */

import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootCustomerApi } from '@/services/api/enterprise-root-customer-api'
import { useEnterpriseRootCustomer } from '@/services/swr/use-enterprise-root-customer'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-customer-form.schema'

export default function useEnterpriseRootCustomerForm(customerId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: customer, mutate: invalidateCache } = useEnterpriseRootCustomer(
    Number(id),
    customerId
  )

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: customer && {
      endclientId: customer?.endclientId,
      enterpriseRootAddressesId: customer?.enterpriseRootAddressesId,
      ouUnitId: customer?.ouUnitId,
      parentId: customer?.parentId,
    },
  })

  const addNewEnterpriseRootCustomer = async (data: InferType<typeof schema>) => {
    const payload = {
      endclientId: data.endclientId,
      enterpriseRootAddressesId: data.enterpriseRootAddressesId,
      ouUnitId: data.ouUnitId,
      parentId: data.parentId,
    }

    try {
      const res = await enterpriseRootCustomerApi.new(Number(id), {
        ...payload,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root customer created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEnterpriseRootCustomer = async (data: InferType<typeof schema>) => {
    if (!customerId) return

    const payload = {
      endclientId: data.endclientId,
      enterpriseRootAddressesId: data.enterpriseRootAddressesId,
      ouUnitId: data.ouUnitId,
      parentId: data.parentId,
    }

    try {
      const res = await enterpriseRootCustomerApi.update(Number(id), customerId, {
        ...payload,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root customer updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (customerId) {
      return updateEnterpriseRootCustomer(submitData)
    }

    return addNewEnterpriseRootCustomer(submitData)
  }

  return { methods, onSubmit }
}
