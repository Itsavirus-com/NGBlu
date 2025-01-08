import * as yup from 'yup'

export const schema = yup.object().shape({
  paymentInfoId: yup.number().required('Payment info is required'),
})
