import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .min(12, 'Password must be at least 12 characters')
    .required('Password is required'),
})
