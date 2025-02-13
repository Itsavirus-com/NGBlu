'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCreditCardTypeForm from '../../components/credit-card-type-form.hook'
import CreditCardTypeForm from '../../components/CreditCardTypeForm'

export default function UpdateCreditCardType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.creditCardTypes')
  const { methods, onSubmit } = useCreditCardTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCreditCardType')} />
      <CreditCardTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
