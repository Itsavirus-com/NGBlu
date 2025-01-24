import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Name is Required').max(255),
  productId: yup.number(),
  serviceId: yup.number(),
  priceConfigId: yup
    .number()
    .required('Price Config is Required')
    .notOneOf([0], 'Price Config is Required'),
  fallbackPriceConfigId: yup.number(),
  isDefault: yup.boolean(),
  inputType: yup.string(),
})
