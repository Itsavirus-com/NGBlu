import * as yup from 'yup'

export const schema = yup.object().shape({
  addressName: yup.string().ensure().max(255, 'Address name must be less than 255 characters'),
  streetname: yup
    .string()
    .ensure()
    .required('Street name is required')
    .max(255, 'Street name must be less than 255 characters'),
  housenumber: yup.string().ensure().max(45, 'House number must be less than 45 characters'),
  housenumberSuffix: yup
    .string()
    .ensure()
    .max(45, 'House number suffix must be less than 45 characters'),
  appartmentNumber: yup
    .string()
    .ensure()
    .max(45, 'Apartment number must be less than 45 characters'),
  area: yup.string().ensure().max(255, 'Area must be less than 255 characters'),
  county: yup.string().ensure().max(255, 'County must be less than 255 characters'),
  city: yup
    .string()
    .ensure()
    .required('City is required')
    .max(255, 'City must be less than 255 characters'),
  postalcode: yup
    .string()
    .ensure()
    .required('Postal code is required')
    .max(45, 'Postal code must be less than 45 characters'),
  countryId: yup.number().required('Country is required'),
  lat: yup
    .string()
    .ensure()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  lng: yup
    .string()
    .ensure()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
  googleAddressId: yup
    .string()
    .ensure()
    .max(150, 'Google address ID must be less than 150 characters'),
})
