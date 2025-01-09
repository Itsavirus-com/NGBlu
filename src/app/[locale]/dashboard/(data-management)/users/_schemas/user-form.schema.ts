import * as yup from 'yup'

export const schema = yup.object().shape({
  displayName: yup.string().ensure().required('Display name is required'),
  email: yup.string().ensure().required('Email is required'),
  password: yup.string().ensure().min(12, 'Password must be at least 12 characters'),
  personId: yup.number(),
  blocked: yup.boolean(),
})
