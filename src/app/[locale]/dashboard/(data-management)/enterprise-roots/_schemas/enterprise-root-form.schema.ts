import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Name is required')
    .max(255, 'Name cannot exceed 255 characters'),
  enterpriseRootAddressesId: yup.number().required('Enterprise root address is required'),
  ouUnitId: yup.number().nullable(),
})
