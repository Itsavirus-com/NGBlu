import * as yup from 'yup'

export const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(
      /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      'Password must contain at least one number or special character'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})
