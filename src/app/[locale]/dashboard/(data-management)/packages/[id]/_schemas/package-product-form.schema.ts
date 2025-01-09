import * as yup from 'yup'

export const schema = yup.object().shape({
  packageId: yup.string().ensure().required('Package is required'),
  productId: yup.string().ensure().required('Product is required'),
  productPricingConfigId: yup.string().ensure().required('Product pricing config is required'),
})
