import * as yup from 'yup'

export const schema = yup.object().shape({
  packageId: yup.string().ensure().required('Package is required'),
  serviceId: yup.string().ensure().required('Service is required'),
  servicePricingConfigId: yup.string().ensure().required('Service pricing config is required'),
})
