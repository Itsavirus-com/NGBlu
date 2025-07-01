'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import OrganizationUnitForm from '../../_components/OrganizationUnitForm'
import useOrganizationUnitForm from '../../_hooks/organization-unit-form.hook'

export default function UpdateOrganizationUnit({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.organizationUnits')

  const { methods, onSubmit, handleChange, isLoading, errorMessageInputType, isSubmitting } =
    useOrganizationUnitForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateOrganizationUnit')} />
      {isLoading ? (
        <Loading />
      ) : (
        <OrganizationUnitForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          errorMessageInputType={errorMessageInputType}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
