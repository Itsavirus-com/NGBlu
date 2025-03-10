import * as yup from 'yup'

import { PHONE_NUMBER_REGEX } from '@/constants/regex'

export const schema = yup.object().shape({
  firstName: yup.string().ensure().max(255, 'First name must be less than 255 characters'),
  lastName: yup.string().ensure().max(255, 'Last name must be less than 255 characters'),
  phoneNumber: yup.string().nullable().matches(PHONE_NUMBER_REGEX, 'Phone number is not valid'),
  email: yup.string(),
  role: yup.string(),
})
