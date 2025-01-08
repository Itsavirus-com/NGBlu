import * as yup from 'yup'

export const schema = yup.object().shape({
  addressId: yup.number().required('Address is required'),
  isPrimaryLocation: yup.boolean(),
})
