'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useGenderForm from '../components/gender-form.hook'
import GenderForm from '../components/GenderForm'

export default function NewGender() {
  const t = useTranslations('dataManagement.genders')
  const { methods, onSubmit } = useGenderForm()

  return (
    <>
      <PageTitle title={t('newGender')} />
      <GenderForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
