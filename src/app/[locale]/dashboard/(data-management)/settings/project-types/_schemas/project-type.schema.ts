import * as yup from 'yup'

export const schema = yup.object().shape({
  projectType: yup
    .string()
    .ensure()
    .required('Project type is required')
    .max(150, 'Project type must be less than 150 characters'),
})
