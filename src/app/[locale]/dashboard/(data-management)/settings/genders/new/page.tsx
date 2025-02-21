'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import GenderForm from '../_components/GenderForm'
import useGenderForm from '../_hooks/gender-form.hook'

export default function NewGender() {
  const t = useTranslations('dataManagement.genders')
  const { methods, onSubmit, isSubmitting } = useGenderForm()

  return (
    <>
      <PageTitle title={t('newGender')} />
      <GenderForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
