import * as yup from 'yup'

export const schema = yup.object().shape({
  paymentInfoId: yup
    .number()
    .required('Payment info is required')
    .notOneOf([0], 'Payment info is required'),
  enterpriseRootId: yup
    .number()
    .required('Enterprise root is required')
    .notOneOf([0], 'Enterprise root is required'),
  businesspartnerId: yup
    .number()
    .required('Business partner is required')
    .notOneOf([0], 'Business partner is required'),
})
