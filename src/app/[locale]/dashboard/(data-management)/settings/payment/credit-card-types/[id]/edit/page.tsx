'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import CreditCardTypeForm from '../../_components/CreditCardTypeForm'
import useCreditCardTypeForm from '../../_hooks/credit-card-type-form.hook'

export default function UpdateCreditCardType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.creditCardTypes')
  const { methods, onSubmit, isSubmitting, isLoading } = useCreditCardTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCreditCardType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CreditCardTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
