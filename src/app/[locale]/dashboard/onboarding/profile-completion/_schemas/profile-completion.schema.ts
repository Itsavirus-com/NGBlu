import * as Yup from 'yup'

const emailValidation = Yup.string()
  .email('Please enter a valid email address')
  .required('This field is required')
const phoneValidation = Yup.string().required('This field is required')
const firstNameValidation = Yup.string().required('First name is required')
const lastNameValidation = Yup.string().required('Last name is required')

// Optional contact info schema
const optionalContactInfoSchema = Yup.object().shape({
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  email: Yup.string().email('Please enter a valid email address').optional(),
  phone: Yup.string().optional(),
})

// Required financial contact schema
const financialContactSchema = Yup.object()
  .shape({
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    email: emailValidation,
    phone: phoneValidation,
  })
  .required()

// Required support contact schema
const supportContactSchema = Yup.object()
  .shape({
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    email: emailValidation,
    phone: phoneValidation,
  })
  .required()

export const profileCompletionSchema = Yup.object().shape({
  // Step 0: General Info - Required fields
  generalEmail: Yup.string().email('Invalid email format').required('General email is required'),
  officePhone: Yup.string().required('Office phone is required'),
  financialContact: Yup.object().shape({
    firstName: Yup.string().required('Financial contact name is required'),
    lastName: Yup.string().required('Financial contact name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Financial contact email is required'),
    phone: Yup.string().required('Financial contact phone is required'),
  }),
  supportContact: Yup.object().shape({
    firstName: Yup.string().required('Support contact name is required'),
    lastName: Yup.string().required('Support contact name is required'),
    email: Yup.string().email('Invalid email format').required('Support contact email is required'),
    phone: Yup.string().required('Support contact phone is required'),
  }),

  // Step 0: General Info - Optional fields
  postalAddress: Yup.string(),
  poNumber: Yup.string(),
  commercialContact: Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email format'),
    phone: Yup.string(),
  }),
  deliveryContact: Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email format'),
    phone: Yup.string(),
  }),
  outOfHoursContact: Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email format'),
    phone: Yup.string(),
  }),

  // Step 1: Legal Confirmation
  legalConfirmation: Yup.boolean().oneOf([true], 'You must accept the legal terms to continue'),

  // Step 2: Logo Upload
  logo: Yup.mixed().nullable(),

  // VAT and financial settings
  vatNumber: Yup.string(),
  iban: Yup.string(),
  invoiceEmail: Yup.string().email('Invalid email format'),

  // Additional financial fields
  bankBic: Yup.string().required('Bank BIC is required'),
  accountHolderName: Yup.string().required('Account holder name is required'),

  // Address Information
  addressType: Yup.string()
    .oneOf(['po_box', 'general_address'])
    .required('Address type is required'),
  poBox: Yup.object().shape({
    number: Yup.string(),
    countryId: Yup.string(),
  }),
  generalAddress: Yup.object().shape({
    streetName: Yup.string(),
    houseNumber: Yup.string(),
    houseNumberSuffix: Yup.string(),
    city: Yup.string(),
    postalCode: Yup.string(),
    countryId: Yup.string(),
  }),
})

// Step-specific validation schemas
export const step1Schema = Yup.object().shape({
  // Required fields for step 1 - General Info
  generalEmail: emailValidation,
  officePhone: phoneValidation,
  invoiceEmail: emailValidation,
  vatNumber: Yup.string().required('VAT/BTW number is required'),
  iban: Yup.string().required('IBAN number is required'),
  bankBic: Yup.string().required('Bank BIC is required'),
  accountHolderName: Yup.string().required('Account holder name is required'),

  // Address Information
  addressType: Yup.string()
    .oneOf(['po_box', 'general_address'])
    .required('Address type is required'),
  poBox: Yup.object().shape({
    number: Yup.string(),
    countryId: Yup.string(),
  }),
  generalAddress: Yup.object().shape({
    streetName: Yup.string(),
    houseNumber: Yup.string(),
    houseNumberSuffix: Yup.string(),
    city: Yup.string(),
    postalCode: Yup.string(),
    countryId: Yup.string(),
  }),
})

export const step2Schema = Yup.object().shape({
  // Required contacts for step 2 - Contact Details
  financialContact: financialContactSchema,
  supportContact: supportContactSchema,
  // Optional contacts
  commercialContact: optionalContactInfoSchema.optional(),
  deliveryContact: optionalContactInfoSchema.optional(),
  outOfHoursContact: optionalContactInfoSchema.optional(),
})

export const step3Schema = Yup.object().shape({
  // Step 3 - Logo Upload (optional)
  logo: Yup.mixed().optional(),
})

export const stepSchemas = [step1Schema, step2Schema, step3Schema]
