'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCreditCardBrandForm from '../components/credit-card-brand-form.hook'
import CreditCardBrandForm from '../components/CreditCardBrandForm'

export default function NewCreditCardBrand() {
  const t = useTranslations('dataManagement.creditCardBrands')
  const { methods, onSubmit } = useCreditCardBrandForm()

  return (
    <>
      <PageTitle title={t('newCreditCardBrand')} />
      <CreditCardBrandForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
