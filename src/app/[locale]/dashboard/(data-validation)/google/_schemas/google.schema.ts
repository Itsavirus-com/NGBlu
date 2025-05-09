import * as yup from 'yup'

export const schema = yup.object().shape({
  // Original address fields (read-only)
  streetAddressOriginal: yup.string().ensure(),
  houseNumberOriginal: yup.string().ensure(),
  houseNumberExtensionOriginal: yup.string().ensure(),
  postcodeOriginal: yup.string().ensure(),
  cityOriginal: yup.string().ensure(),
  countryOriginal: yup.string().ensure(),
  latOriginal: yup.string().ensure(),
  lonOriginal: yup.string().ensure(),

  // Proposed address fields (editable)
  streetAddress: yup.string().required('Street address is required'),
  houseNumber: yup.string().required('House number is required'),
  houseNumberExtension: yup.string().ensure(),
  postcode: yup.string().required('Postcode is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  lat: yup.string().ensure(),
  lon: yup.string().ensure(),
})
