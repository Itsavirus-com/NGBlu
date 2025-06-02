'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import CreditCardTypeForm from '../_components/CreditCardTypeForm'
import useCreditCardTypeForm from '../_hooks/credit-card-type-form.hook'

export default function NewCreditCardType() {
  const t = useTranslations('dataManagement.creditCardTypes')
  const { methods, onSubmit, isSubmitting, isLoading } = useCreditCardTypeForm()

  return (
    <>
      <PageTitle title={t('newCreditCardType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CreditCardTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
