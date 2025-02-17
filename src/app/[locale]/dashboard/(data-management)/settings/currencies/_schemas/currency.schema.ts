import * as yup from 'yup'

export const schema = yup.object().shape({
  currency: yup
    .string()
    .ensure()
    .required('Currency is required')
    .max(45, 'Currency must be less than 45 characters'),
})
