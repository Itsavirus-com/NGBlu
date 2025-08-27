'use client'

import { useFormContext } from 'react-hook-form'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

// Import partner managers data
const MOCK_PARTNER_MANAGERS = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 3, name: 'Mark Johnson', email: 'mark.johnson@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'NGBLU Sales-RBAC' },
  { id: 5, name: 'Robert Brown', email: 'robert.brown@example.com', role: 'NGBLU Sales-RBAC' },
]

// Mock countries data
const MOCK_COUNTRIES = [
  { id: 1, name: 'Netherlands', code: 'NL' },
  { id: 2, name: 'Belgium', code: 'BE' },
  { id: 3, name: 'Germany', code: 'DE' },
  { id: 4, name: 'France', code: 'FR' },
  { id: 5, name: 'United Kingdom', code: 'GB' },
]

export const useReviewForm = () => {
  const { getValues } = useFormContext<CreateBusinessPartnerFormData>()
  const formValues = getValues()

  // Format boolean values to Yes/No for display
  const formatBooleanValue = (value: boolean | undefined): string => {
    return value ? 'Yes' : 'No'
  }

  // Format file values for display with clickable link functionality
  const formatFileValue = (value: File | undefined) => {
    if (!value) {
      return {
        hasFile: false,
        displayText: 'No file uploaded',
        fileName: '',
        fileSize: '',
        fileUrl: null,
      }
    }

    const fileSize = (value.size / 1024).toFixed(0) + 'kB'
    const fileUrl = URL.createObjectURL(value)

    return {
      hasFile: true,
      displayText: `${value.name} (${fileSize})`,
      fileName: value.name,
      fileSize,
      fileUrl,
    }
  }

  // Get partner manager details by ID
  const getPartnerManagerDetails = (id: number | undefined) => {
    if (!id) {
      return null
    }

    const manager = MOCK_PARTNER_MANAGERS.find(manager => manager.id === id)
    return manager || null
  }

  // Get country name by ID
  const getCountryName = (id: number | undefined) => {
    if (!id) {
      return null
    }

    const country = MOCK_COUNTRIES.find(country => country.id === id)
    return country?.name || null
  }

  // Function to open file in new tab
  const openFileInNewTab = (file: File) => {
    const fileUrl = URL.createObjectURL(file)
    const newWindow = window.open(fileUrl, '_blank')

    // Clean up the URL after a delay to prevent memory leaks
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => {
          URL.revokeObjectURL(fileUrl)
        }, 1000)
      }
    } else {
      // Fallback: clean up immediately if window couldn't be opened
      URL.revokeObjectURL(fileUrl)
    }
  }

  // Check if approval is needed based on product configuration
  const getApprovalRequirements = () => {
    const { direct, whiteLabel, layer2, layer3 } = formValues

    const approvalRequirements = []

    // Rule 1: If only Direct Price Model is selected without Whitelabel price model
    if (direct && !whiteLabel) {
      approvalRequirements.push({
        rule: 'Direct Price Model without Whitelabel',
        message: 'Approval needed from Sales Manager Role',
      })
    }

    // Rule 2: If layer 2 is selected and layer 3 is selected
    if (layer2 && layer3) {
      approvalRequirements.push({
        rule: 'Layer 2 and Layer 3',
        message: 'Approval needed from Sales Manager Role',
      })
    }

    return approvalRequirements
  }

  return {
    formValues,
    formatBooleanValue,
    formatFileValue,
    getPartnerManagerDetails,
    getCountryName,
    openFileInNewTab,
    getApprovalRequirements,
  }
}
