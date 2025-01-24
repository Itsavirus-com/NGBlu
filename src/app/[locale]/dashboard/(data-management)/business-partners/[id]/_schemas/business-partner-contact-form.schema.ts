import * as yup from 'yup'

export const schema = yup.object().shape({
  personId: yup.number().required('Person is required').notOneOf([0], 'Person is required'),
  contactInfoId: yup
    .number()
    .required('Contact Info is required')
    .notOneOf([0], 'Contact Info is required'),
  responsibilityId: yup
    .number()
    .required('Responsibility is required')
    .notOneOf([0], 'Responsibility is required'),
})
