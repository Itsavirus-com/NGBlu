import * as yup from 'yup'

import { PHONE_NUMBER_REGEX } from '@/constants/regex'

export const schema = (isEdit: boolean) =>
  yup.object({
    firstname: yup.string().required('First name is required').max(255),
    lastname: yup.string().required('Last name is required').max(255),
    phoneNumber: yup.string().nullable().matches(PHONE_NUMBER_REGEX, 'Phone number is not valid'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    roles: yup.array().min(1, 'At least one role is required').required('Roles are required'),
    authType: !isEdit
      ? yup.string().required('Invitation method is required').oneOf(['manual', 'microsoft'])
      : yup.string().oneOf(['manual', 'microsoft']).optional(),
    blocked: yup.boolean(),
  })
