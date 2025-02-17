import * as yup from 'yup'

export const schema = yup.object().shape({
  status: yup
    .string()
    .ensure()
    .required('Status is required')
    .max(45, 'Status must be less than 45 characters'),
})
