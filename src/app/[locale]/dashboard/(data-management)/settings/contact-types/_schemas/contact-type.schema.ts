import * as yup from 'yup'

export const schema = yup.object().shape({
  contactType: yup
    .string()
    .ensure()
    .required('Contact type is required')
    .max(150, 'Contact type must be less than 150 characters'),
  parentId: yup.number(),
})
