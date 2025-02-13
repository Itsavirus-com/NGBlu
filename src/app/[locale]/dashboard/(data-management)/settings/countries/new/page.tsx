'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCountryForm from '../components/country-form.hook'
import CountryForm from '../components/CountryForm'

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
