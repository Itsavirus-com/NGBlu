import * as yup from 'yup'

export const schema = yup.object().shape({
  gender: yup
    .string()
    .ensure()
    .required('Gender is required')
    .max(45, 'Gender must be less than 45 characters'),
})
