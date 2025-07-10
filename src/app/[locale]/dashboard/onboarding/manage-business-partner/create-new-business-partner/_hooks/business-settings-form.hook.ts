import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

// Mock Partner Manager users with NGBLU Sales-RBAC role
export const MOCK_PARTNER_MANAGERS = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 3, name: 'Mark Johnson', email: 'mark.johnson@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 5, name: 'Robert Brown', email: 'robert.brown@example.com', role: 'NGBLU Sales-RBAC' },
]

export const useBusinessSettings = () => {
  const t = useTranslations('businessPartner.businessSettings')
  const {
    control,
    setValue,
    getValues,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateBusinessPartnerFormData>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  // Watch the partner manager ID value
  const partnerManagerId = useWatch({ control, name: 'partnerManagerId' })
  const signedContractFile = useWatch({ control, name: 'signedContractFile' })

  // Monitor form errors and clear them when file is present
  useEffect(() => {
    if (selectedFile && errors.signedContractFile) {
      // Clear the error if we have a valid file
      clearErrors('signedContractFile')
      setFileError(null)
    } else if (errors.signedContractFile && !selectedFile) {
      const errorMessage = errors.signedContractFile.message as string

      if (errorMessage && errorMessage.startsWith('fileUploadErrors.')) {
        setFileError(t('fileUploadErrors.required'))
      } else if (errorMessage) {
        setFileError(errorMessage)
      }
    }
  }, [errors, selectedFile, clearErrors])

  // Initialize selectedFile state from form values when component mounts
  useEffect(() => {
    const existingFile = getValues('signedContractFile')
    if (existingFile && !selectedFile) {
      setSelectedFile(existingFile as any)
    }
  }, [getValues, selectedFile])

  // Update selectedFile when signedContractFile changes
  useEffect(() => {
    if (signedContractFile && signedContractFile !== '') {
      setSelectedFile(signedContractFile as any)
      setFileError(null)
      // Clear any existing errors
      clearErrors('signedContractFile')
    } else if (signedContractFile === '') {
      setSelectedFile(null)
    }
  }, [signedContractFile, clearErrors])

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    setFileError(null)

    if (files && files.length > 0) {
      const file = files[0]

      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        setFileError(t('fileUploadErrors.invalidType'))
        return
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes
      if (file.size > maxSize) {
        setFileError(t('fileUploadErrors.tooLarge'))
        return
      }

      // File is valid
      setSelectedFile(file)
      setValue('signedContractFile', file)

      // Clear any existing errors and trigger validation
      clearErrors('signedContractFile')
      setFileError(null)
      trigger('signedContractFile')
    }
  }

  // Handle partner manager selection
  const handlePartnerManagerChange = (value: string | number | null, optionData: any) => {
    // Convert string ID to number and set it directly
    if (value && value !== '0') {
      const numericId = Number(value)
      setValue('partnerManagerId', numericId)

      // Trigger validation to clear any previous errors
      trigger('partnerManagerId')
    }
  }

  // Handle file removal
  const handleFileRemove = () => {
    setSelectedFile(null)
    setValue('signedContractFile', null as any)

    // Set error message immediately for better UX
    setFileError(t('fileUploadErrors.required'))

    // Trigger validation to update form state
    setTimeout(() => {
      trigger('signedContractFile')
    }, 100)
  }

  // Only show error if there's no file and there's a validation error
  const shouldShowError = !selectedFile && (fileError || errors.signedContractFile)

  return {
    partnerManagerId,
    selectedFile,
    partnerManagers: MOCK_PARTNER_MANAGERS,
    fileError: shouldShowError ? fileError || t('fileUploadErrors.required') : null,
    handleFileChange,
    handlePartnerManagerChange,
    handleFileRemove,
  }
}
