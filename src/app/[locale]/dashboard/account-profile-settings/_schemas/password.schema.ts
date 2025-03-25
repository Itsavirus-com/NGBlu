import * as yup from 'yup'

export const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current password is required')
    .min(12, 'Current password must be at least 12 characters'),
  password: yup
    .string()
    .required('New password is required')
    .min(12, 'New password must be at least 12 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export type PasswordFormType = yup.InferType<typeof passwordSchema>
