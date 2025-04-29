import * as yup from 'yup'

export const schema = yup.object().shape({
  personId: yup.number().required('Person is required').notOneOf([0], 'Person is required'),
  responsibilityId: yup
    .number()
    .required('Responsibility is required')
    .notOneOf([0], 'Responsibility is required'),
  contactInfoId: yup
    .number()
    .required('Contact info is required')
    .notOneOf([0], 'Contact info is required'),
  ouUnitId: yup.number().nullable(),
})
