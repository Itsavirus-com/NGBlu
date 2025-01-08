import * as yup from 'yup'

export const schema = yup.object().shape({
  priceValue: yup
    .number()
    .typeError('Price value must be a number')
    .required('Price value is required'),
  priceUnitId: yup
    .number()
    .typeError('Price unit must be a number')
    .required('Price unit is required'),
  priceCurrencyId: yup
    .number()
    .typeError('Price currency must be a number')
    .required('Price currency is required'),
  priceTypeId: yup
    .number()
    .typeError('Price type must be a number')
    .required('Price type is required'),
  priceIntervalId: yup
    .number()
    .typeError('Price interval must be a number')
    .required('Price interval is required'),
  priceTaxId: yup
    .number()
    .typeError('Price tax must be a number')
    .required('Price tax is required'),
})
