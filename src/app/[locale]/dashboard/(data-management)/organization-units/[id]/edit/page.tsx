'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import OrganizationUnitForm from '../../_components/OrganizationUnitForm'
import useOrganizationUnitForm from '../../_hooks/organization-unit-form.hook'

export default function UpdateOrganizationUnit({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.organizationUnits')

  const { methods, onSubmit, handleChange, errorMessageInputType, isSubmitting } =
    useOrganizationUnitForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateOrganizationUnit')} />
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
