import * as yup from 'yup'

export const passwordVerificationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Current password is required')
    .min(12, 'Password must be at least 12 characters'),
})

export type PasswordVerificationFormType = yup.InferType<typeof passwordVerificationSchema>
