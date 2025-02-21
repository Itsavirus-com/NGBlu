'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import CountryForm from '../../_components/CountryForm'
import useCountryForm from '../../_hooks/country-form.hook'

export default function UpdateCountry({ params }: { params: { countryId: number } }) {
  const t = useTranslations('dataManagement.countries')
  const { methods, onSubmit, isSubmitting, isLoading } = useCountryForm(Number(params.countryId))

  return (
    <>
      <PageTitle title={t('updateCountry')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CountryForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
