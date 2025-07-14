'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CountryForm from '../../_components/CountryForm'
import useCountryForm from '../../_hooks/country-form.hook'

export default function UpdateCountry({ params }: { params: { countryId: number } }) {
  const t = useTranslations('dataManagement.countries')
  const { methods, onSubmit, isSubmitting } = useCountryForm(Number(params.countryId))

  return (
    <>
      <PageTitle title={t('updateCountry')} />
      <CountryForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
