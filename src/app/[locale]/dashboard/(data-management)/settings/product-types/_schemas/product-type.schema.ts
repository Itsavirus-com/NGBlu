import * as yup from 'yup'

export const schema = yup.object().shape({
  productType: yup
    .string()
    .ensure()
    .required('Product type is required')
    .max(45, 'Product type must be less than 45 characters'),
})
