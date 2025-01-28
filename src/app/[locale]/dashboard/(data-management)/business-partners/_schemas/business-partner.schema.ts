import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Company name is required')
    .max(255, 'Company name must be at most 255 characters'),
  businesspartnerTypeId: yup
    .number()
    .required('Business partner type is required')
    .notOneOf([0], 'Business partner type is required'),
  companyInfoId: yup
    .number()
    .required('Company Info is required')
    .notOneOf([0], 'Company Info is required'),
  enterpriseRootId: yup
    .number()
    .required('Enterprise root is required')
    .notOneOf([0], 'Enterprise root is required'),
  businesspartnersAddressesId: yup
    .number()
    .required('Business partner address is required')
    .notOneOf([0], 'Business partner address is required'),
  ouUnitId: yup.number(),
  parentId: yup.number(),
})
