'use client'

import { useFormContext } from 'react-hook-form'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useReviewForm = () => {
  const { getValues } = useFormContext<CreateBusinessPartnerFormData>()
  const formValues = getValues()

  // Format boolean values to Yes/No for display
  const formatBooleanValue = (value: boolean | undefined): string => {
    return value ? 'Yes' : 'No'
  }

  // Format file values for display
  const formatFileValue = (value: File | undefined): string => {
    return value ? value.name : 'No file uploaded'
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
    getApprovalRequirements,
  }
}
