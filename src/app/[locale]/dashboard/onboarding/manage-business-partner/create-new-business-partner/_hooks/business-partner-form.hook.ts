import { useTranslations } from 'next-intl'

import { useBusinessPartnerForm } from './create-business-partner.hook'
import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useCreateBusinessPartnerForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner')
  const businessPartnerForm = useBusinessPartnerForm()
  const { isSubmitting, isSuccess, createBusinessPartner } = businessPartnerForm

  const breadcrumbItems = [
    {
      name: t('breadcrumbs.manageBusinessPartner'),
      path: '/dashboard/onboarding/manage-business-partner',
      type: 'manage',
    },
    {
      name: t('breadcrumbs.createNewBusinessPartner'),
      path: '/dashboard/onboarding/manage-business-partner/create-new-business-partner',
      type: 'create',
    },
  ]

  const onSubmit = async (data: CreateBusinessPartnerFormData) => {
    await createBusinessPartner(data)
  }

  const getSubmitButtonText = () => {
    if (isSubmitting) return t('buttons.creating')
    if (isSuccess) return t('buttons.createdSuccessfully')
    return t('buttons.createBusinessPartner')
  }

  const isSubmitButtonDisabled = () => {
    return isSubmitting || isSuccess
  }

  return {
    ...businessPartnerForm,
    breadcrumbItems,
    onSubmit,
    getSubmitButtonText,
    isSubmitButtonDisabled,
  }
}
