'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import OrganizationUnitForm from '../_components/OrganizationUnitForm'
import useOrganizationUnitForm from '../_hooks/organization-unit-form.hook'

export default function NewOrganizationUnit() {
  const t = useTranslations('dataManagement.organizationUnits')
  const { methods, handleChange, onSubmit, errorMessageInputType, isSubmitting } =
    useOrganizationUnitForm()

  return (
    <>
      <PageTitle title={t('newOrganizationUnit')} />
      <OrganizationUnitForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        errorMessageInputType={errorMessageInputType}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
