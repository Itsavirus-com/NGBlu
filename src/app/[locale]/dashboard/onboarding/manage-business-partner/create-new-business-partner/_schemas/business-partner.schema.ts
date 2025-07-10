import * as yup from 'yup'

export const createBusinessPartnerSchema = yup.object({
  // Business Partner Info
  kvkNumber: yup.string().optional(),
  companyName: yup.string().required('Company Name is required'),

  // Address Info (required)
  postalCodeHouse: yup.string().optional(), // This is just for lookup, not required for submission
  streetName: yup.string().required('Street Name is required'),
  postalCode: yup.string().required('Postal Code is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  houseNumber: yup.string().required('House Number is required'),

  // Primary Contact Info
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  emailAddress: yup.string().email('Invalid email format').required('Email Address is required'),

  // Business Settings
  partnerManagerId: yup.number().required('Partner Manager is required'),
  signedContractFile: yup
    .mixed()
    .test('required', 'fileUploadErrors.required', value => {
      // Accept File objects as valid
      if (value instanceof File) {
        return true
      }
      // Consider null, undefined, empty string as empty
      if (value === null || value === undefined || value === '') {
        return false
      }
      return true
    })
    .test('fileType', 'fileUploadErrors.invalidType', value => {
      if (value === null || value === undefined || value === '') return true // Skip validation if no file
      if (value instanceof File) {
        return value.type === 'application/pdf'
      }
      return true
    })
    .test('fileSize', 'fileUploadErrors.tooLarge', value => {
      if (value === null || value === undefined || value === '') return true // Skip validation if no file
      if (value instanceof File) {
        const maxSize = 10 * 1024 * 1024 // 10MB in bytes
        return value.size <= maxSize
      }
      return true
    }),

  // Product Configuration
  // Layer 3 Data Products
  layer3: yup.boolean().default(true),
  whiteLabel: yup.boolean().default(true),
  whiteLabelInternet: yup.boolean().default(false),
  whiteLabelIPVPN: yup.boolean().default(false),
  whiteLabelMobileData: yup.boolean().default(false),
  whiteLabelSDWAN: yup.boolean().default(false),

  direct: yup.boolean().default(false),
  directInternet: yup.boolean().default(false),
  directIPVPN: yup.boolean().default(false),
  directMobileData: yup.boolean().default(false),
  directSDWAN: yup.boolean().default(false),

  // Layer 2 Data Products
  layer2: yup.boolean().default(false),
  deltaAccessLayer2: yup.boolean().default(false),

  // Voice Products
  voice: yup.boolean().default(true),
  traditionalTelephony: yup.boolean().default(true),
  ipTelephony: yup.boolean().default(true),
  xelion: yup.boolean().default(true),
  hostedTelephony: yup.boolean().default(true),
  sipTrunking: yup.boolean().default(true),
  oneSpace: yup.boolean().default(true),
  fixedMobileIntegration: yup.boolean().default(true),
})

export type CreateBusinessPartnerFormData = yup.InferType<typeof createBusinessPartnerSchema>
