import * as yup from 'yup'

import { PHONE_NUMBER_REGEX } from '@/constants/regex'

export const schema = yup.object().shape({
  firstName: yup.string().ensure().max(255, 'First name must be less than 255 characters'),
  lastName: yup.string().ensure().max(255, 'Last name must be less than 255 characters'),
  phoneNumber: yup
    .string()
    .nullable()
    .test('phone-format', 'Phone number is not valid', function (value) {
      // Skip validation if field is empty
      if (!value) return true
      // Apply validation if value exists
      return PHONE_NUMBER_REGEX.test(value)
    }),
  email: yup.string().email('Please enter a valid email address'),
  roles: yup.string(),
  password: yup
    .string()
    .nullable()
    .test('min-length', 'Password must be at least 12 characters', function (value) {
      // Skip validation if field is empty
      if (!value) return true
      // Apply validation if value exists
      return value.length >= 12
    }),
})
