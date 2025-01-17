import * as yup from 'yup'

export const schema = yup.object().shape({
  projectId: yup.number().required('Project is required'),
  endclientAddressesId: yup.number().required('End client address is required'),
  ouUnitId: yup.number(),
})
