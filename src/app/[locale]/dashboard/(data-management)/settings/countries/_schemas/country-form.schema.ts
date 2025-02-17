import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Name is required')
    .max(150, 'Name must be less than 150 characters'),
  currency: yup.string().ensure().max(45, 'Currency must be less than 45 characters'),
  locale: yup
    .string()
    .ensure()
    .required('Locale is required')
    .max(45, 'Locale must be less than 45 characters'),
  decimalSymbol: yup
    .string()
    .ensure()
    .required('Decimal symbol is required')
    .max(45, 'Decimal symbol must be less than 45 characters'),
  iso: yup
    .string()
    .ensure()
    .required('ISO is required')
    .max(45, 'ISO must be less than 45 characters'),
})
