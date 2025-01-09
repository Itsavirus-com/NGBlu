import * as yup from 'yup'

export const schema = yup.object().shape({
  projectInfo: yup.string().ensure().required('Project info is required'),
})
