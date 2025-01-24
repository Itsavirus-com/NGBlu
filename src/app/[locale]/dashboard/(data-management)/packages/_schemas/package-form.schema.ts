import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Name is required'),
  packageTypeId: yup
    .number()
    .required('Package type is required')
    .notOneOf([0], 'Package type is required'),
  priceConfigId: yup
    .number()
    .required('Price config is required')
    .notOneOf([0], 'Price config is required'),
})
