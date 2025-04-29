import * as yup from 'yup'

export const schema = yup.object().shape({
  userId: yup.number().required('User is required').notOneOf([0], 'User is required'),
  personId: yup.number().required('Person is required').notOneOf([0], 'Person is required'),
  ouUnitId: yup.number().nullable(),
})
