'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CreditCardBrandForm from '../../_components/CreditCardBrandForm'
import useCreditCardBrandForm from '../../_hooks/credit-card-brand-form.hook'

export default function UpdateCreditCardBrand({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.creditCardBrands')
  const { methods, onSubmit } = useCreditCardBrandForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCreditCardBrand')} />
      <CreditCardBrandForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
