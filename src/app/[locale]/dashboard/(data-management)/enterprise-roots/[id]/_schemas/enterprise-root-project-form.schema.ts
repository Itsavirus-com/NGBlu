import * as yup from 'yup'

export const schema = yup.object().shape({
  projectId: yup.number().required('Project is required'),
  enterpriseRootAddressesId: yup.number().required('Enterprise root address is required'),
  ouUnitId: yup.number(),
})
