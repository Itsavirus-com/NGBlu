'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CreditCardTypeForm from '../_components/CreditCardTypeForm'
import useCreditCardTypeForm from '../_hooks/credit-card-type-form.hook'

export default function NewCreditCardType() {
  const t = useTranslations('dataManagement.creditCardTypes')
  const { methods, onSubmit, isSubmitting } = useCreditCardTypeForm()

  return (
    <>
      <PageTitle title={t('newCreditCardType')} />

      <CreditCardTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
