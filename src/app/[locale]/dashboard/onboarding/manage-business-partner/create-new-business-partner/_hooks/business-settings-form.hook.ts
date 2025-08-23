import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useBusinessSettings = () => {
  const t = useTranslations('dataManagement.createBusinessPartner.businessSettings')
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

  // Watch the form values
  const managerId = useWatch({ control, name: 'managerId' })
  const contract = useWatch({ control, name: 'contract' })
  const enableAutoDebit = useWatch({ control, name: 'enableAutoDebit' })
  const termsAccepted = useWatch({ control, name: 'termsAccepted' })

  // Monitor form errors and clear them when file is present
  useEffect(() => {
    if (selectedFile && errors.contract) {
      // Clear the error if we have a valid file
      clearErrors('contract')
      setFileError(null)
    } else if (errors.contract && !selectedFile) {
      const errorMessage = errors.contract.message as string

      if (errorMessage && errorMessage.startsWith('fileUploadErrors.')) {
        setFileError(t('fileUploadErrors.required'))
      } else if (errorMessage) {
        setFileError(errorMessage)
      }
    }
  }, [errors, selectedFile, clearErrors])

  // Initialize selectedFile state from form values when component mounts
  useEffect(() => {
    const existingFile = getValues('contract')
    if (existingFile && !selectedFile) {
      setSelectedFile(existingFile as any)
    }
  }, [getValues, selectedFile])

  // Update selectedFile when contract changes
  useEffect(() => {
    if (contract && contract !== '') {
      setSelectedFile(contract as any)
      setFileError(null)
      // Clear any existing errors
      clearErrors('contract')
    } else if (contract === '') {
      setSelectedFile(null)
    }
  }, [contract, clearErrors])

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
      setValue('contract', file)

      // Clear any existing errors and trigger validation
      clearErrors('contract')
      setFileError(null)
      trigger('contract')
    }
  }

  // Handle partner manager selection
  const handlePartnerManagerChange = (value: string | number | null, optionData: any) => {
    // Convert string ID to number and set it directly
    if (value && value !== '0') {
      const numericId = Number(value)
      setValue('managerId', numericId)

      // Trigger validation to clear any previous errors
      trigger('managerId')
    }
  }

  // Handle file removal
  const handleFileRemove = () => {
    setSelectedFile(null)
    setValue('contract', null as any)

    // Set error message immediately for better UX
    setFileError(t('fileUploadErrors.required'))

    // Trigger validation to update form state
    setTimeout(() => {
      trigger('contract')
    }, 100)
  }

  // Only show error if there's no file and there's a validation error
  const shouldShowError = !selectedFile && (fileError || errors.contract)

  return {
    managerId,
    selectedFile,
    fileError: shouldShowError ? fileError || t('fileUploadErrors.required') : null,
    enableAutoDebit,
    termsAccepted,
    handleFileChange,
    handlePartnerManagerChange,
    handleFileRemove,
  }
}
