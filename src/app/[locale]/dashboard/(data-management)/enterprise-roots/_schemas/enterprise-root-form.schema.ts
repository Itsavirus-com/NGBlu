import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Company Name is required')
    .max(255, 'Company Name cannot exceed 255 characters'),
  enterpriseRootAddressesId: yup
    .number()
    .required('Address is required')
    .notOneOf([0], 'Address is required'),
  ouUnitId: yup.number().nullable(),
})
