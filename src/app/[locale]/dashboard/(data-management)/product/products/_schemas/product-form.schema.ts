import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Name is required')
    .max(255, 'Name must be at most 255 characters'),
  description: yup
    .string()
    .ensure()
    .required('Description is required')
    .max(255, 'Description must be at most 255 characters'),
  productTypeId: yup.number().required('Product type is required'),
  inputType: yup.string().ensure(),
})
