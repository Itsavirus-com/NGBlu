export interface ProfileCompletionData {
  // Step 0: General Info - Required fields
  generalEmail: string
  officePhone: string
  invoiceEmail: string
  vatNumber: string
  iban: string
  enableAutoDebit: boolean
  termsAccepted: boolean

  // Step 0: General Info - Optional fields
  postalAddress: string
  poNumber: string

  // Step 1: Contact Details - Required contacts
  financialContact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  supportContact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }

  // Step 1: Contact Details - Optional contacts
  commercialContact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  deliveryContact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  outOfHoursContact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }

  // Step 2: Logo Upload
  logo: File | null
}

export interface StepComponentProps {
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
  isValid: boolean
}

export interface GeneralInfoStepProps {
  // This component now gets data from React Hook Form context
}

export interface ContactDetailsStepProps {
  // This component now gets data from React Hook Form context
}

export interface LogoUploadStepProps {
  // This component now gets data from React Hook Form context
}
