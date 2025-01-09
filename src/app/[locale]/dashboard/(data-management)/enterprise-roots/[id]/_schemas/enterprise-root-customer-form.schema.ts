import * as yup from 'yup'

export const schema = yup.object().shape({
  endclientId: yup.number().required('End client is required'),
  enterpriseRootAddressesId: yup.number().required('Enterprise root address is required'),
  ouUnitId: yup.number(),
  parentId: yup.number(),
})
