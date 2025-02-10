/**
 * Custom hook for managing the contact type form, including creating or updating contact types.
 *
 * This hook handles the form submission logic for adding or updating a contact type,
 * as well as initializing form values based on the provided `contactTypeId`.
 * It uses the `react-hook-form` library for form management and validation via `yup`.
 *
 * @param {number | undefined} contactTypeId - The ID of the contact type to edit. If undefined, a new contact type will be created.
 * @returns {object} The `methods` object from `useForm` to be passed to the form, and the `onSubmit` handler to process form submission.
 *
 * @example
 * const { methods, onSubmit } = useContactTypeForm(contactTypeId);
 *
 * // Usage in a form:
 * <form onSubmit={methods.handleSubmit(onSubmit)}>
 *   <input {...methods.register('contactType')} />
 *   <input {...methods.register('id')} />
 *   <button type="submit">Submit</button>
 * </form>
 */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { contactTypeApi } from '@/services/api/contact-type-api'
import { useContactType } from '@/services/swr/use-contact-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useContactTypeForm(contactTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: contactType, mutate: invalidateCache } = useContactType(contactTypeId)

  const schema = yup.object().shape({
    contactType: yup
      .string()
      .ensure()
      .required('Contact type is required')
      .max(150, 'Contact type must be less than 150 characters'),
    parentId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: {
      contactType: contactType?.contactType ?? '',
      parentId: contactType?.parent.id,
    },
  })

  const addNewContactType = async (data: InferType<typeof schema>) => {
    const payload = {
      contactType: data.contactType,
      parentId: data.parentId,
    }

    try {
      const res = await contactTypeApi.new(payload)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Contact type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateContactType = async (data: InferType<typeof schema>) => {
    if (!contactTypeId) return

    const payload = {
      contactType: data.contactType,
      parentId: data.parentId,
    }

    try {
      const res = await contactTypeApi.update(contactTypeId, payload)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Contact type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (contactTypeId) {
      return updateContactType(submitData)
    }

    return addNewContactType(submitData)
  }

  return { methods, onSubmit }
}
