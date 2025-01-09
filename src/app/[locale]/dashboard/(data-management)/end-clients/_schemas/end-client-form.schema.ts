import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Name is required').max(255),
  typeId: yup.number().required('Type is required'),
  statusId: yup.number().required('Status is required'),
  locationAddressId: yup.number().required('Location Address is required'),
  contactPersonId: yup.number(),
  accountNumber: yup.string().ensure().max(45),
  personId: yup.number(),
  afasId: yup.string().ensure().max(45),
  companyInfoId: yup.number(),
})
