import * as yup from 'yup'

export const schema = yup.object().shape({
  bankname: yup
    .string()
    .nullable()
    .when('selectedPayment', {
      is: 1,
      then: schema =>
        schema
          .required('Bank name is required')
          .max(45, 'Bank name must be less than 45 characters'),
      otherwise: schema => schema.nullable(),
    }),
  bankIban: yup
    .string()
    .nullable()
    .when('selectedPayment', {
      is: 1,
      then: schema =>
        schema
          .required('Bank IBAN is required')
          .max(45, 'Bank IBAN must be less than 45 characters'),
      otherwise: schema => schema.nullable(),
    }),
  bankBic: yup
    .string()
    .nullable()
    .when('selectedPayment', {
      is: 1,
      then: schema =>
        schema.required('Bank BIC is required').max(45, 'Bank BIC must be less than 45 characters'),
      otherwise: schema => schema.nullable(),
    }),
  creditcardNumber: yup
    .string()
    .nullable()
    .when('selectedPayment', {
      is: 2,
      then: schema =>
        schema
          .required('Credit card number is required')
          .max(155, 'Credit card number must be less than 155 characters'),
      otherwise: schema => schema.nullable(),
    }),
  validTo: yup
    .string()
    .nullable()
    .when('selectedPayment', {
      is: 2,
      then: schema => schema.required('Valid to date is required'),
      otherwise: schema => schema.nullable(),
    }),
  ccv: yup
    .string()
    .nullable()
    .when('selectedPayment', {
      is: 2,
      then: schema =>
        schema.required('CCV is required').max(3, 'CCV must be less than 3 characters'),
      otherwise: schema => schema.nullable(),
    }),
  paymentTypeId: yup.number().required('Payment type is required'),
  creditcardTypeId: yup
    .number()
    .nullable()
    .when('selectedPayment', {
      is: 2,
      then: schema => schema.required('Credit card type is required'),
      otherwise: schema => schema.nullable().typeError('Credit card type must be a number'),
    }),
  creditcardBrandId: yup
    .number()
    .nullable()
    .when('selectedPayment', {
      is: 2,
      then: schema => schema.required('Credit card brand is required'),
      otherwise: schema => schema.nullable().typeError('Credit card brand must be a number'),
    }),
  bankAddressId: yup.number().nullable().typeError('Bank address must be a number'),
  personId: yup
    .number()
    .nullable()
    .required('Person is required')
    .test('not-zero', 'Person is required', value => value !== 0),
  endclientId: yup.number().nullable(),
  businesspartnerId: yup.number().nullable(),
  enterpriseRootId: yup.number().required('Enterprise root is required'),
  selectedPayment: yup.number().required('Payment type is required'),
})
