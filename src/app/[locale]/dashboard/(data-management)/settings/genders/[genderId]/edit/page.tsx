'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import GenderForm from '../../_components/GenderForm'
import useGenderForm from '../../_hooks/gender-form.hook'

export default function UpdateGender({ params }: { params: { genderId: number } }) {
  const t = useTranslations('dataManagement.genders')
  const { methods, onSubmit, isSubmitting, isLoading } = useGenderForm(Number(params.genderId))

  return (
    <>
      <PageTitle title={t('updateGender')} />
      {isLoading ? (
        <Loading />
      ) : (
        <GenderForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
