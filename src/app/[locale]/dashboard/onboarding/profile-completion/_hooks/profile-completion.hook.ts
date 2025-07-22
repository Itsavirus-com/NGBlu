'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'

import { stepSchemas } from '../_schemas/profile-completion.schema'
import { ProfileCompletionData } from '../_types/profile-completion.type'

export function useProfileCompletion() {
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)

  const defaultValues: ProfileCompletionData = {
    // Step 0: General Info - Required fields
    generalEmail: '',
    officePhone: '',
    invoiceEmail: '',
    vatNumber: '',
    iban: '',
    enableAutoDebit: true,
    termsAccepted: true,

    // Step 0: General Info - Optional fields
    postalAddress: '',
    poNumber: '',

    // Step 1: Contact Details - Required contacts
    financialContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    supportContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },

    // Step 1: Contact Details - Optional contacts
    commercialContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    deliveryContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    outOfHoursContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },

    // Step 2: Logo Upload
    logo: null,
  }

  const form = useForm<ProfileCompletionData>({
    resolver: yupResolver(profileCompletionSchema) as any,
    defaultValues,
    mode: 'onChange',
  })

  const { getValues } = form

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const stepSchema = stepSchemas[stepIndex]
    if (!stepSchema) return true

    try {
      const formValues = getValues()

      // Additional validation for step 0 (General Info)
      if (stepIndex === 0) {
        // Check if auto debit is enabled but terms not accepted
        if (formValues.enableAutoDebit && !formValues.termsAccepted) {
          form.setError('termsAccepted', {
            type: 'manual',
            message: 'You must accept the terms and conditions for automatic collection',
          })
          return false
        }
      }

      await stepSchema.validate(formValues, { abortEarly: false })
      return true
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          if (err.path) {
            form.setError(err.path as any, {
              type: 'manual',
              message: err.message,
            })
          }
        })
      }
      return false
    }
  }

  const nextStep = useCallback(async () => {
    if (currentStep < 2) {
      // Updated: now 2 is the last step (0, 1, 2)
      const isValid = await validateStep(currentStep)
      if (isValid) {
        setCurrentStep(currentStep + 1)
      }
    }
  }, [currentStep, validateStep])

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const goToStep = useCallback(
    async (stepIndex: number) => {
      // Validate that the step index is within bounds
      if (stepIndex < 0 || stepIndex > 2) return

      // If going forward, validate current step first
      if (stepIndex > currentStep) {
        const isValid = await validateStep(currentStep)
        if (!isValid) return
      }

      // Navigate to the target step
      setCurrentStep(stepIndex)
    },
    [currentStep, validateStep]
  )

  const isStepCompleted = useCallback(
    (stepIndex: number): boolean => {
      return stepIndex < currentStep
    },
    [currentStep]
  )

  const isStepValid = useCallback(
    async (stepIndex: number): Promise<boolean> => {
      return await validateStep(stepIndex)
    },
    [validateStep]
  )

  const onSubmit = async (data: ProfileCompletionData) => {
    console.log('Form submitted with data:', data)
    showToast({
      variant: 'success',
      title: 'Success',
      body: 'Profile completion submitted successfully!',
    })
  }

  return {
    form,
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    isStepCompleted,
    isStepValid,
    onSubmit,
  }
}

// Create a comprehensive schema for all steps
const profileCompletionSchema = Yup.object().shape({
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
  enableAutoDebit: Yup.boolean(),
  invoiceEmail: Yup.string().email('Invalid email format'),
})
