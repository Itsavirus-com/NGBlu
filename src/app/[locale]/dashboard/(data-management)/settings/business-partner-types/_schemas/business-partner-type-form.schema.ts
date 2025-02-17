import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Name is required')
    .max(150, 'Name must be less than 150 characters'),
})
