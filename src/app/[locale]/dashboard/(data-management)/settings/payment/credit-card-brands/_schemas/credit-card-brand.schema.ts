import * as yup from 'yup'

export const schema = yup.object().shape({
  brandname: yup
    .string()
    .ensure()
    .required('Brand name is required')
    .max(150, 'Brand name must be less than 150 characters'),
})
