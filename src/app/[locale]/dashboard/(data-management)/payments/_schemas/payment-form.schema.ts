import * as yup from 'yup'

export const schema = yup.object().shape({
  bankname: yup.string().ensure().max(45, 'Bank name must be less than 45 characters'),
  bankIban: yup.string().ensure().max(45, 'Bank IBAN must be less than 45 characters'),
  bankBic: yup.string().ensure().max(45, 'Bank BIC must be less than 45 characters'),
  creditcardNumber: yup
    .string()
    .ensure()
    .max(155, 'Credit card number must be less than 155 characters'),
  validTo: yup.string().ensure().required('Valid to date is required'),
  ccv: yup.string().ensure().max(3, 'CCV must be less than 3 characters'),
  paymentTypeId: yup.number().required('Payment type is required'),
  creditcardTypeId: yup.number().nullable().typeError('Credit card type must be a number'),
  creditcardBrandId: yup.number().nullable().typeError('Credit card brand must be a number'),
  bankAddressId: yup.number().nullable().typeError('Bank address must be a number'),
  personId: yup.number().required('Person is required'),
  endclientId: yup.number().nullable().typeError('End client must be a number'),
  businesspartnerId: yup.number().nullable().typeError('Business partner must be a number'),
  enterpriseRootId: yup.number().required('Enterprise root is required'),
})
