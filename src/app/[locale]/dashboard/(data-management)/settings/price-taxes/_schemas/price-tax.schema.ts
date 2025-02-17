import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Name is required')
    .max(150, 'Name must be less than 150 characters'),
  taxValue: yup.number().typeError('Tax value must be a number').required('Tax value is required'),
  priceUnitId: yup
    .number()
    .required('Price unit is required')
    .notOneOf([0], 'Price unit is required'),
  countryId: yup.number().required('Country is required').notOneOf([0], 'Country is required'),
})
