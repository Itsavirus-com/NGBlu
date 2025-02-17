import * as yup from 'yup'

export const schema = yup.object().shape({
  addressType: yup
    .string()
    .ensure()
    .required('Address type is required')
    .max(150, 'Address type must be less than 150 characters'),
})
