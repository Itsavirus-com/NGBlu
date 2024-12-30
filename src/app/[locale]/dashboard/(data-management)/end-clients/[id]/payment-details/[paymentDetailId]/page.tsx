'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEndClientPaymentDetail } from '@/services/swr/use-end-client-payment-detail'

import { PaymentDetailBankAddress } from './components/payment-detail-bank-address'
import { PaymentDetailCreditCard } from './components/payment-detail-credit-card'
import { PaymentDetailInfo } from './components/payment-detail-info'

export default function EndClientPaymentDetails({
  params,
}: {
  params: { id: number; paymentDetailId: number }
}) {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const { data, isLoading } = useEndClientPaymentDetail(
    Number(params.id),
    Number(params.paymentDetailId)
  )

  const tabs = [
    {
      eventKey: 'generalInfo',
      title: t('generalInfo'),
      content: <PaymentDetailInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'creditCardInfo',
      title: t('creditCardInfo'),
      content: <PaymentDetailCreditCard data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'bankAddress',
      title: t('bankAddress'),
      content: <PaymentDetailBankAddress data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="generalInfo" />
    </>
  )
}
