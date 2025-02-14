'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCreditCardTypeForm from '../components/credit-card-type-form.hook'
import CreditCardTypeForm from '../components/CreditCardTypeForm'

export default function NewCreditCardType() {
  const t = useTranslations('dataManagement.creditCardTypes')
  const { methods, onSubmit } = useCreditCardTypeForm()

  return (
    <>
      <PageTitle title={t('newCreditCardType')} />
      <CreditCardTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
