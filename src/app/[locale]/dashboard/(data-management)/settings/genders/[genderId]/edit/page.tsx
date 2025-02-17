'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import GenderForm from '../../_components/GenderForm'
import useGenderForm from '../../_hooks/gender-form.hook'

export default function UpdateGender({ params }: { params: { genderId: number } }) {
  const t = useTranslations('dataManagement.genders')
  const { methods, onSubmit } = useGenderForm(Number(params.genderId))

  return (
    <>
      <PageTitle title={t('updateGender')} />
      <GenderForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
