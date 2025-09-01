'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { businessPartnerApi } from '@/services/api/business-partner-api'

import { profileCompletionSchema, stepSchemas } from '../_schemas/profile-completion.schema'
import { ProfileCompletionData } from '../_types/profile-completion.type'

export function useProfileCompletion() {
  const { push } = useRouter()
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)

  const defaultValues: ProfileCompletionData = {
    // Step 0: General Info - Required fields
    generalEmail: '',
    officePhone: '',
    invoiceEmail: '',
    vatNumber: '',
    iban: '',

    // Step 0: General Info - Optional fields

    // Additional financial fields
    bankBic: '',
    accountHolderName: '',
    poNumber: '',

    // Address Information
    addressType: 'po_box',
    poBox: {
      number: '',
      countryId: '1',
    },
    generalAddress: {
      streetName: '',
      houseNumber: '',
      houseNumberSuffix: '',
      city: '',
      postalCode: '',
      countryId: '1',
    },

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
        // No additional validation needed
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

  // Transform form data to match API contract
  const transformFormDataToApiPayload = (data: ProfileCompletionData): FormData => {
    const formData = new FormData()

    // General Info
    formData.append('general_email', data.generalEmail)
    formData.append('office_phone_number', data.officePhone)
    formData.append('invoice_email', data.invoiceEmail)
    formData.append('vat_number', data.vatNumber)
    formData.append('bank_iban', data.iban)

    // Address Information
    if (data.addressType === 'po_box') {
      formData.append('po_box[number]', data.poBox.number)
      formData.append('po_box[country_id]', data.poBox.countryId)
    } else if (data.addressType === 'general_address') {
      formData.append('postal_address[streetname]', data.generalAddress.streetName)
      formData.append('postal_address[housenumber]', data.generalAddress.houseNumber)
      if (data.generalAddress.houseNumberSuffix) {
        formData.append('postal_address[housenumber_suffix]', data.generalAddress.houseNumberSuffix)
      }
      formData.append('postal_address[city]', data.generalAddress.city)
      formData.append('postal_address[postalcode]', data.generalAddress.postalCode)
      formData.append('postal_address[country_id]', data.generalAddress.countryId)
    }

    // Bank BIC
    formData.append('bank_bic', data.bankBic)

    // Account holder name
    formData.append('account_holder_name', data.accountHolderName)

    // PO Number (optional)
    if (data.poNumber) {
      formData.append('po_number', data.poNumber)
    }

    // Financial Contact
    formData.append('financial_contact[first_name]', data.financialContact.firstName)
    formData.append('financial_contact[last_name]', data.financialContact.lastName)
    formData.append('financial_contact[email]', data.financialContact.email)
    formData.append('financial_contact[phone_number]', data.financialContact.phone)

    // Support Contact
    formData.append('support_contact[first_name]', data.supportContact.firstName)
    formData.append('support_contact[last_name]', data.supportContact.lastName)
    formData.append('support_contact[email]', data.supportContact.email)
    formData.append('support_contact[phone_number]', data.supportContact.phone)

    // Commercial Contact (if provided)
    if (data.commercialContact.firstName && data.commercialContact.lastName) {
      formData.append('marketing_contact[first_name]', data.commercialContact.firstName)
      formData.append('marketing_contact[last_name]', data.commercialContact.lastName)
      formData.append('marketing_contact[email]', data.commercialContact.email)
      formData.append('marketing_contact[phone_number]', data.commercialContact.phone)
    }

    // Delivery Contact (if provided)
    if (data.deliveryContact.firstName && data.deliveryContact.lastName) {
      formData.append('delivery_contact[first_name]', data.deliveryContact.firstName)
      formData.append('delivery_contact[last_name]', data.deliveryContact.lastName)
      formData.append('delivery_contact[email]', data.deliveryContact.email)
      formData.append('delivery_contact[phone_number]', data.deliveryContact.phone)
    }

    // Out of Hours Contact (if provided)
    if (data.outOfHoursContact.firstName && data.outOfHoursContact.lastName) {
      formData.append('out_of_hours_support_contact[first_name]', data.outOfHoursContact.firstName)
      formData.append('out_of_hours_support_contact[last_name]', data.outOfHoursContact.lastName)
      formData.append('out_of_hours_support_contact[email]', data.outOfHoursContact.email)
      formData.append('out_of_hours_support_contact[phone_number]', data.outOfHoursContact.phone)
    }

    // Logo file
    if (data.logo instanceof File) {
      formData.append('logo', data.logo)
    }
    formData.append('_method', 'PUT')

    return formData
  }

  const onSubmit = async (data: ProfileCompletionData) => {
    try {
      // Transform form data to API payload
      const payload = transformFormDataToApiPayload(data)

      // Call the API
      const response = await businessPartnerApi.updateBusinessPartnerProfile(payload)

      if (response.ok) {
        showToast({
          variant: 'success',
          title: 'Success',
          body: 'Business partner profile updated successfully!',
        })
        push('/dashboard')
        return { success: true, data: response.data }
      } else {
        showToast({
          variant: 'danger',
          title: 'Error',
          body: response.problem || 'Failed to update business partner profile',
        })
        return { success: false, error: response.problem }
      }
    } catch (error: any) {
      console.error('Profile update error:', error)
      showToast({
        variant: 'danger',
        title: 'Error',
        body: error.message || 'An unexpected error occurred',
      })
      return { success: false, error: error }
    }
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
