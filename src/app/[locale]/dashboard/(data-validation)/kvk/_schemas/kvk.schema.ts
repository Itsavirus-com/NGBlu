import * as yup from 'yup'

export const schema = yup.object().shape({
  companyName: yup.string().ensure().required(),
  kvkNumber: yup.string().ensure(),
  streetAddress: yup.string().ensure(),
  houseNumber: yup.string().ensure(),
  houseNumberExtension: yup.string().ensure(),
  postcode: yup.string().ensure(),
  city: yup.string().ensure(),
  country: yup.string().ensure(),
  validationAction: yup.string().ensure(),
  companyNameOriginal: yup.string().ensure(),
  kvkNumberOriginal: yup.string().ensure(),
  streetAddressOriginal: yup.string().ensure(),
  houseNumberOriginal: yup.string().ensure(),
  houseNumberExtensionOriginal: yup.string().ensure(),
  postcodeOriginal: yup.string().ensure(),
  cityOriginal: yup.string().ensure(),
  countryOriginal: yup.string().ensure(),
})
