import * as yup from 'yup'

export const schema = yup.object().shape({
  addressId: yup.number().required('Address is required'),
  addressTypeId: yup.number().required('Address Type is required'),
  ouUnitId: yup.number(),
})
