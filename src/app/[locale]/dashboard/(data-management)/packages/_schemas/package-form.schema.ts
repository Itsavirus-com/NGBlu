import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Name is required'),
  packageTypeId: yup.number().required('Package type is required'),
  priceConfigId: yup.number().required('Price config is required'),
})
