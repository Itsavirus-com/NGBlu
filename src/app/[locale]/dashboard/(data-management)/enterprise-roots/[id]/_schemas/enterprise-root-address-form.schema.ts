import * as yup from 'yup'

export const schema = yup.object().shape({
  addressId: yup.number().required('Address is required').notOneOf([0], 'Address is required'),
  addressTypeId: yup
    .number()
    .required('Address type is required')
    .notOneOf([0], 'Address type is required'),
  ouUnitId: yup.number().required('OU unit is required').notOneOf([0], 'OU unit is required'),
})
