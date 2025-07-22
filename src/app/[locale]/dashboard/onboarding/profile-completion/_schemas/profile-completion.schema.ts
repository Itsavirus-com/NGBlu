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
  generalEmail: emailValidation,
  officePhone: phoneValidation,
  invoiceEmail: emailValidation,
  vatNumber: Yup.string().required('This field is required'),
  iban: Yup.string().required('This field is required'),
  enableAutoDebit: Yup.boolean().optional(),
  termsAccepted: Yup.boolean().when('enableAutoDebit', {
    is: true,
    then: schema =>
      schema.oneOf([true], 'You must accept the terms and conditions for automatic collection'),
    otherwise: schema => schema.optional(),
  }),
  postalAddress: Yup.string().optional(),
  poNumber: Yup.string().optional(),

  // Step 1: Contact Details
  financialContact: financialContactSchema,
  supportContact: supportContactSchema,
  commercialContact: optionalContactInfoSchema.optional(),
  deliveryContact: optionalContactInfoSchema.optional(),
  outOfHoursContact: optionalContactInfoSchema.optional(),

  // Step 2: Logo Upload
  logo: Yup.mixed().optional(),
})

// Step-specific validation schemas
export const step1Schema = Yup.object().shape({
  // Required fields for step 1 - General Info
  generalEmail: emailValidation,
  officePhone: phoneValidation,
  invoiceEmail: emailValidation,
  vatNumber: Yup.string().required('VAT/BTW number is required'),
  iban: Yup.string().required('IBAN number is required'),
  enableAutoDebit: Yup.boolean().optional(),
  termsAccepted: Yup.boolean().when('enableAutoDebit', {
    is: true,
    then: schema =>
      schema.oneOf([true], 'You must accept the terms and conditions for automatic collection'),
    otherwise: schema => schema.optional(),
  }),
  postalAddress: Yup.string().optional(),
  poNumber: Yup.string().optional(),
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
