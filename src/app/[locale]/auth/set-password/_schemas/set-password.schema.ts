import * as yup from 'yup'

export const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})
