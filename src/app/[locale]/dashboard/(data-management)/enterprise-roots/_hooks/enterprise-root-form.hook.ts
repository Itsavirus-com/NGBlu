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
 * - `@/utils/object`: Utility for omitting null and undefined values
 *
 * @param {number} [enterpriseRootId] - Optional ID of the enterprise root for editing
 * @returns {object} - Form methods and submit handler
 */

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useSentry } from '@/hooks'
import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootApi } from '@/services/api/enterprise-root-api'
import { useEnterpriseRoot } from '@/services/swr/use-enterprise-root'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-form.schema'

export default function useEnterpriseRootForm(enterpriseRootId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { captureException, withSpan } = useSentry()

  const {
    data: enterpriseRoot,
    isLoading,
    mutate: invalidateCache,
  } = useEnterpriseRoot(enterpriseRootId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: enterpriseRoot && {
      name: enterpriseRoot.name,
      enterpriseRootAddressesId: enterpriseRoot.enterpriseRootAddressesId,
      ouUnitId: enterpriseRoot.ouUnitId,
    },
  })

  const addNewEnterpriseRoot = async (data: InferType<typeof schema>) => {
    console.log('Starting enterprise root creation with data:', data)

    try {
      const res = await enterpriseRootApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root created successfully' })
        invalidateCache()
        back()
        return res
      } else {
        const error = new Error(`Failed to create enterprise root: ${res.status} ${res.problem}`)
        Object.assign(error, {
          apiResponse: res,
          formData: data,
          context: 'EnterpriseRootForm.addNewEnterpriseRoot',
        })
        throw error
      }
    } catch (error) {
      console.error('Enterprise root creation error:', error)
      captureException(error instanceof Error ? error : new Error(String(error)), {
        component: 'EnterpriseRootForm',
        action: 'addNewEnterpriseRoot',
        extra: { data },
      })
      showUnexpectedToast()
      throw error
    }
  }

  const updateEnterpriseRoot = async (data: InferType<typeof schema>) => {
    if (!enterpriseRootId) return

    console.log('Starting enterprise root update with data:', data)

    try {
      const res = await enterpriseRootApi.update(enterpriseRootId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root updated successfully' })
        invalidateCache()
        back()
        return res
      } else {
        const error = new Error(`Failed to update enterprise root: ${res.status} ${res.problem}`)
        Object.assign(error, {
          apiResponse: res,
          formData: data,
          enterpriseRootId,
          context: 'EnterpriseRootForm.updateEnterpriseRoot',
        })
        throw error
      }
    } catch (error) {
      console.error('Enterprise root update error:', error)
      captureException(error instanceof Error ? error : new Error(String(error)), {
        component: 'EnterpriseRootForm',
        action: 'updateEnterpriseRoot',
        extra: { enterpriseRootId, data },
      })
      showUnexpectedToast()
      throw error
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    try {
      if (enterpriseRootId) {
        await withLoading(() => updateEnterpriseRoot(submitData))
      } else {
        await withLoading(() => addNewEnterpriseRoot(submitData))
      }
    } catch (error) {
      console.error('Form submission error (fallback handler):', error)
    }
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
