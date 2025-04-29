import * as yup from 'yup'

export const schema = yup.object().shape({
  businesspartnersAddressesId: yup
    .number()
    .required('Business Partner Address is required')
    .notOneOf([0], 'Business Partner Address is required'),
  projectId: yup.number().required('Project is required').notOneOf([0], 'Project is required'),
  ouUnitId: yup.number().nullable(),
})
