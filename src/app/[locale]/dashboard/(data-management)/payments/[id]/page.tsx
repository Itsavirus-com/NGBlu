'use client'

import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
import { usePayment } from '@/services/swr/use-payment'
import { getSearchQueryParams } from '@/utils/queryParams'
import { safeRender } from '@/utils/safeRender'

export default function PaymentDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.payments')
  const searchParams = useSearchParams()
  const queryParams = getSearchQueryParams(searchParams.toString().toLowerCase())

  const { data, isLoading } = usePayment(
    params.id,
    queryParams.selectedpayment === 'bank' ? 'bank' : 'credit-card'
  )

  const paymentInfoFields = [
    {
      label: t('personName'),
      value: `${safeRender(data, 'person.firstname')} ${safeRender(data, 'person.lastname')}`,
    },
    { label: t('paymentType'), value: safeRender(data, 'paymentType.paymentType') },
    { label: t('bankName'), value: safeRender(data, 'bankname') },
    { label: t('bankIban'), value: safeRender(data, 'bankIban') },
    { label: t('bankBic'), value: safeRender(data, 'bankBic') },
  ]

  const creditCardInfoFields = [
    {
      label: t('creditCardNumber'),
      value: safeRender(data, 'creditcardNumber'),
    },
    {
      label: t('cvc/cvv'),
      value: safeRender(data, 'cvv'),
    },
    {
      label: t('validTo'),
      value: data?.validTo ? dayjs(data?.validTo).format(dateTimeFormats.date) : '-',
    },
    {
      label: t('creditCardType'),
      value: safeRender(data, 'creditCardType.creditcardType'),
    },
    {
      label: t('creditCardBrand'),
      value: safeRender(data, 'creditCardBrand.brandname'),
    },
  ]

  const bankAddressFields = [
    {
      label: t('addressName'),
      value: safeRender(data, 'bankAddress.addressName'),
    },
    {
      label: t('streetName'),
      value: safeRender(data, 'bankAddress.streetname'),
    },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'bankAddress.housenumberSuffix'),
    },
    {
      label: t('houseNumber'),
      value: safeRender(data, 'bankAddress.housenumber'),
    },
    {
      label: t('apartmentNumber'),
      value: safeRender(data, 'bankAddress.appartmentNumber'),
    },
    {
      label: t('area'),
      value: safeRender(data, 'bankAddress.area'),
    },
    {
      label: t('county'),
      value: safeRender(data, 'bankAddress.county'),
    },
    {
      label: t('city'),
      value: safeRender(data, 'bankAddress.city'),
    },
    {
      label: t('country'),
      value: safeRender(data, 'bankAddress.country.name'),
    },
    {
      label: t('postalCode'),
      value: safeRender(data, 'bankAddress.postalcode'),
    },
    {
      label: t('latitude'),
      value: safeRender(data, 'bankAddress.lat'),
    },
    {
      label: t('longitude'),
      value: safeRender(data, 'bankAddress.lng'),
    },
    {
      label: t('googleAddressId'),
      value: safeRender(data, 'bankAddress.googleAddressId'),
    },
  ]

  const tabs = [
    {
      eventKey: 'generalInfo',
      title: t('generalInfo'),
      content: (
        <FieldTextView
          fields={paymentInfoFields}
          isLoading={isLoading}
          translation="dataManagement.payments"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'creditCardInfo',
      title: t('creditCardInfo'),
      content: (
        <FieldTextView
          fields={creditCardInfoFields}
          isLoading={isLoading}
          translation="dataManagement.payments"
        />
      ),
      condition: Boolean(data && queryParams.selectedpayment === 'credit card'),
    },
    {
      eventKey: 'bankAddress',
      title: t('bankAddress'),
      content: (
        <FieldTextView
          fields={bankAddressFields}
          isLoading={isLoading}
          translation="dataManagement.payments"
        />
      ),
      condition: Boolean(data && queryParams.selectedpayment === 'bank'),
    },
  ]
  return (
    <>
      <PageTitle
        title={`${t('paymentDetail')}: ${data?.person.firstname || ''} ${data?.person.lastname || ''}`}
      />
      <DynamicTabs tabs={tabs} defaultActiveKey="generalInfo" />
    </>
  )
}
