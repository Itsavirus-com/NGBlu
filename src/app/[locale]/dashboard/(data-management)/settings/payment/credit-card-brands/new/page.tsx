'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import CreditCardBrandForm from '../_components/CreditCardBrandForm'
import useCreditCardBrandForm from '../_hooks/credit-card-brand-form.hook'

export default function NewCreditCardBrand() {
  const t = useTranslations('dataManagement.creditCardBrands')
  const { methods, onSubmit, isSubmitting, isLoading } = useCreditCardBrandForm()

  return (
    <>
      <PageTitle title={t('newCreditCardBrand')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CreditCardBrandForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
