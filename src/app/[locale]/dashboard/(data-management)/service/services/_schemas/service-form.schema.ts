import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup
    .string()
    .ensure()
    .required('Name is required')
    .max(255, 'Name must be at most 255 characters'),
  description: yup.string().ensure(),
  serviceTypeId: yup
    .number()
    .required('Service type is required')
    .notOneOf([0], 'Service type is required'),
  inputType: yup.string().ensure().required(),
})
