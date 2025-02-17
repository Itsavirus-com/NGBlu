import * as yup from 'yup'

export const schema = yup.object().shape({
  type: yup
    .string()
    .ensure()
    .required('Type is required')
    .max(150, 'Type must be less than 150 characters'),
})
