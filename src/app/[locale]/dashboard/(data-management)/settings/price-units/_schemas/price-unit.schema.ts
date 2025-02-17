import * as yup from 'yup'

export const schema = yup.object().shape({
  unit: yup
    .string()
    .ensure()
    .required('Unit is required')
    .max(45, 'Unit must be less than 45 characters'),
})
