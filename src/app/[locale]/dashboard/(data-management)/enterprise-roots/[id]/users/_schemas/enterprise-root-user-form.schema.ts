import * as yup from 'yup'

export const schema = yup.object().shape({
  userId: yup.number().required('User is required'),
  personId: yup.number().required('Person is required'),
  ouUnitId: yup.number(),
})
