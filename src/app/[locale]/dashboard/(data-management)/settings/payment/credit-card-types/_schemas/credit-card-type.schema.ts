import * as yup from 'yup'

export const schema = yup.object().shape({
  creditcardType: yup
    .string()
    .ensure()
    .required('Credit card type is required')
    .max(45, 'Credit card type must be less than 45 characters'),
})
