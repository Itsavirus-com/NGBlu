'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCreditCardBrandForm from '../../components/credit-card-brand-form.hook'
import CreditCardBrandForm from '../../components/CreditCardBrandForm'

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
