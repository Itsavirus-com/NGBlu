import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Client Name is required').max(255),
  typeId: yup.number().required('Client Type is required').notOneOf([0], 'Client Type is required'),
  statusId: yup
    .number()
    .required('Client Status is required')
    .notOneOf([0], 'Client Status is required'),
  locationAddressId: yup
    .number()
    .required('Address is required')
    .notOneOf([0], 'Address is required'),
  companyInfoId: yup.number().nullable(),
})
