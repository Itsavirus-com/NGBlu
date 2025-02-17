import * as yup from 'yup'

export const schema = yup.object().shape({
  serviceType: yup
    .string()
    .ensure()
    .required('Service type is required')
    .max(45, 'Service type must be less than 45 characters'),
})
