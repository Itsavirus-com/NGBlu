import * as yup from 'yup'

export const schema = yup.object().shape({
  companyname: yup
    .string()
    .ensure()
    .required('Company name is required')
    .max(255, 'Company name must be less than 255 characters'),
  companyStatusId: yup
    .number()
    .required('Company status is required')
    .notOneOf([0], 'Company status is required'),
  visitAddressId: yup
    .number()
    .required('Visit address is required')
    .notOneOf([0], 'Visit address is required'),
  postalAddressId: yup.number(),
  invoiceAddressId: yup
    .number()
    .required('Invoice address is required')
    .notOneOf([0], 'Invoice address is required'),
  legalAddressId: yup
    .number()
    .required('Legal address is required')
    .notOneOf([0], 'Legal address is required'),
  chamberOfCommerceId: yup.string().ensure().required('Chamber of commerce ID is required'),
  vatNumber: yup.string(),
  originId: yup.number(),
})
