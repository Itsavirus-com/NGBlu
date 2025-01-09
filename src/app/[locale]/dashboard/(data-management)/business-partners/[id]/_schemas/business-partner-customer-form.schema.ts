import * as yup from 'yup'

export const schema = yup.object().shape({
  endclientId: yup.number().required('End Client is required'),
  businesspartnersAddressesId: yup.number().required('Business Partner is required'),
  ouUnitId: yup.number(),
})
