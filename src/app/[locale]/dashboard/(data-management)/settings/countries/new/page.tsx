'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CountryForm from '../_components/CountryForm'
import useCountryForm from '../_hooks/country-form.hook'

export default function NewCountry() {
  const t = useTranslations('dataManagement.countries')
  const { methods, onSubmit } = useCountryForm()

  return (
    <>
      <PageTitle title={t('newCountry')} />
      <CountryForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
