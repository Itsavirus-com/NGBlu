import * as yup from 'yup'

import { PHONE_NUMBER_REGEX } from '@/constants/regex'

export const profileSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First name is required')
    .max(255, 'First name must be less than 255 characters'),
  lastname: yup
    .string()
    .required('Last name is required')
    .max(255, 'Last name must be less than 255 characters'),
  phoneNumber: yup
    .string()
    .nullable()
    .test('phone-format', 'Phone number is not valid', function (value) {
      // Skip validation if field is empty
      if (!value) return true
      // Apply validation if value exists
      return PHONE_NUMBER_REGEX.test(value)
    }),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  roles: yup.string(),
})

export type ProfileFormType = yup.InferType<typeof profileSchema>
