import * as yup from 'yup'

export const createBusinessPartnerSchema = yup.object({
  // Business Partner Info
  name: yup
    .string()
    .required('Company Name is required')
    .max(255, 'Company Name must be less than 255 characters'),
  chamberOfCommerceId: yup
    .string()
    // .required('Chamber of Commerce ID is required')
    .max(50, 'Chamber of Commerce ID must be less than 50 characters')
    .nullable(),
  sbiCodes: yup.array().optional(),

  // Manager and Type
  managerId: yup.number().required('Manager is required').integer('Manager ID must be an integer'),
  businesspartnerTypeId: yup
    .number()
    .default(1)
    .integer('Business Partner Type ID must be an integer'),
  enterpriseRootId: yup.number().default(1).integer('Enterprise Root ID must be an integer'),

  // Address Info (required)
  address: yup
    .object({
      countryId: yup
        .number()
        .required('Country is required')
        .integer('Country ID must be an integer'),
      streetname: yup
        .string()
        .required('Street Name is required')
        .max(255, 'Street Name must be less than 255 characters'),
      housenumber: yup
        .string()
        .required('House Number is required')
        .max(45, 'House Number must be less than 45 characters'),
      appartmentNumber: yup
        .string()
        .nullable()
        .max(45, 'Apartment Number must be less than 45 characters'),
      housenumberSuffix: yup
        .string()
        .nullable()
        .max(45, 'House Number Suffix must be less than 45 characters'),
      addressName: yup
        .string()
        .nullable()
        .max(255, 'Address Name must be less than 255 characters'),
      postalcode: yup
        .string()
        .required('Postal Code is required')
        .max(45, 'Postal Code must be less than 45 characters'),
      county: yup.string().nullable().max(255, 'County must be less than 255 characters'),
      city: yup
        .string()
        .required('City is required')
        .max(255, 'City must be less than 255 characters'),
      area: yup.string().nullable().max(255, 'Area must be less than 255 characters'),
      lat: yup
        .string()
        .nullable()
        .matches(/^\d+\.\d{2,9}$/, 'Latitude must be a decimal with 2-9 decimal places'),
      lng: yup
        .string()
        .nullable()
        .matches(/^\d+\.\d{2,9}$/, 'Longitude must be a decimal with 2-9 decimal places'),
      googleAddressId: yup
        .string()
        .nullable()
        .max(150, 'Google Address ID must be less than 150 characters'),
    })
    .required('Address is required'),

  // Contact Info
  contactInfo: yup
    .object({
      firstname: yup
        .string()
        .required('First Name is required')
        .max(45, 'First Name must be less than 45 characters'),
      lastname: yup
        .string()
        .required('Last Name is required')
        .max(45, 'Last Name must be less than 45 characters'),
      phoneNumber: yup
        .string()
        .required('Phone Number is required')
        .max(45, 'Phone Number must be less than 45 characters')
        .matches(/^\+?[0-9\s\-().]{7,45}$/, 'Phone Number must be in valid format'),
      email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format')
        .max(255, 'Email must be less than 255 characters'),
    })
    .required('Contact Info is required'),

  // Product Category Layers
  productCategoryLayers: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required('Layer ID is required'),
        isEnabled: yup.boolean().required('Layer enabled status is required'),
        categories: yup
          .array()
          .of(
            yup.object({
              id: yup.number().required('Category ID is required'),
              isEnabled: yup.boolean().required('Category enabled status is required'),
              subCategories: yup
                .array()
                .of(
                  yup.object({
                    id: yup.number().required('Sub-category ID is required'),
                    isEnabled: yup.boolean().required('Sub-category enabled status is required'),
                  })
                )
                .required('Sub-categories are required'),
            })
          )
          .required('Categories are required'),
      })
    )
    .default([]),

  // Payment Settings
  enableAutoDebit: yup.boolean().default(false),
  termsAccepted: yup
    .boolean()
    .test('terms-required', 'You must accept the terms and conditions', function (value) {
      // Only require terms acceptance if auto debit is enabled
      const enableAutoDebit = this.parent.enableAutoDebit
      if (enableAutoDebit) {
        return value === true
      }
      return true
    }),

  // Contract File
  contract: yup
    .mixed()
    .test('required', 'Contract file is required', value => {
      if (value === null || value === undefined || value === '') {
        return false
      }
      return true
    })
    .test('fileType', 'Contract must be a PDF file', value => {
      if (value === null || value === undefined || value === '') return true
      if (value instanceof File) {
        return value.type === 'application/pdf'
      }
      return true
    })
    .test('fileSize', 'Contract file must be less than 10MB', value => {
      if (value === null || value === undefined || value === '') return true
      if (value instanceof File) {
        const maxSize = 10 * 1024 * 1024 // 10MB in bytes
        return value.size <= maxSize
      }
      return true
    }),

  // Legacy fields for backward compatibility (will be mapped in the hook)
  kvkNumber: yup.string().optional(),
  companyName: yup.string().optional(),
  postalCodeHouse: yup.string().optional(),
  streetName: yup.string().optional(),
  postalCode: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  houseNumber: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  emailAddress: yup.string().optional(),
  partnerManagerId: yup.number().optional(),
  signedContractFile: yup.mixed().optional(),

  // Product Configuration (legacy fields)
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
  layer2: yup.boolean().default(false),
  deltaAccessLayer2: yup.boolean().default(false),
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
