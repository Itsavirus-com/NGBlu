import * as yup from 'yup'

export const schema = yup.object().shape({
  responsibility: yup
    .string()
    .ensure()
    .required('Responsibility is required')
    .max(255, 'Responsibility must be at most 255 characters'),
})
