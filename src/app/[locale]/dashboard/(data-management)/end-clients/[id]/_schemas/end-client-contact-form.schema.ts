import * as yup from 'yup'

export const schema = yup.object().shape({
  personId: yup.number().required('Person is required'),
  responsibilityId: yup.number().required('Responsibility is required'),
  contactInfoId: yup.number().required('Contact info is required'),
  enterpriseRootId: yup.number().required('Enterprise root is required'),
})
