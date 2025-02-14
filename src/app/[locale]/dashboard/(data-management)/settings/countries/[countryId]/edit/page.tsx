'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCountryForm from '../../components/country-form.hook'
import CountryForm from '../../components/CountryForm'

export default function UpdateCountry({ params }: { params: { countryId: number } }) {
  const t = useTranslations('dataManagement.countries')
  const { methods, onSubmit } = useCountryForm(Number(params.countryId))

  return (
    <>
      <PageTitle title={t('updateCountry')} />
      <CountryForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
