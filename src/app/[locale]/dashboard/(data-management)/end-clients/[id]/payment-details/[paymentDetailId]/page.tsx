'use client'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEndClientPaymentDetail } from '@/services/swr/use-end-client-payment-detail'
import { safeRender } from '@/utils/safeRender'

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

  const bankAddressFields = [
    { label: t('addressName'), value: safeRender(data, 'paymentInfo.bankAddress.addressName') },
    { label: t('streetName'), value: safeRender(data, 'paymentInfo.bankAddress.streetname') },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'paymentInfo.bankAddress.housenumberSuffix'),
    },
    { label: t('houseNumber'), value: safeRender(data, 'paymentInfo.bankAddress.housenumber') },
    {
      label: t('apartmentNumber'),
      value: safeRender(data, 'paymentInfo.bankAddress.appartmentNumber'),
    },
    { label: t('area'), value: safeRender(data, 'paymentInfo.bankAddress.area') },
    { label: t('county'), value: safeRender(data, 'paymentInfo.bankAddress.county') },
    { label: t('city'), value: safeRender(data, 'paymentInfo.bankAddress.city') },
    { label: t('country'), value: safeRender(data, 'paymentInfo.bankAddress.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'paymentInfo.bankAddress.postalcode') },
    { label: t('latitude'), value: safeRender(data, 'paymentInfo.bankAddress.lat') },
    { label: t('longitude'), value: safeRender(data, 'paymentInfo.bankAddress.lng') },
    {
      label: t('googleAddressId'),
      value: safeRender(data, 'paymentInfo.bankAddress.googleAddressId'),
    },
  ]

  const creditCardFields = [
    { label: t('creditCardNumber'), value: safeRender(data, 'paymentInfo.creditcardNumber') },
    { label: t('cvc/cvv'), value: safeRender(data, 'paymentInfo.cvc/cvv') },
    {
      label: t('validTo'),
      value: data?.paymentInfo.validTo
        ? dayjs(data.paymentInfo.validTo).format(dateTimeFormats.date)
        : '-',
    },
    {
      label: t('creditCardType'),
      value: safeRender(data, 'paymentInfo.creditCardType.creditcardType'),
    },
    {
      label: t('creditCardBrand'),
      value: safeRender(data, 'paymentInfo.creditCardBrand.brandname'),
    },
  ]

  const detailInfoFields = [
    {
      label: t('personName'),
      value: data?.paymentInfo.person
        ? `${data?.paymentInfo.person.firstname} ${data?.paymentInfo.person.lastname}`
        : '-',
    },
    { label: t('paymentType'), value: safeRender(data, 'paymentInfo.paymentType.paymentType') },
    { label: t('bankName'), value: safeRender(data, 'paymentInfo.bankname') },
    { label: t('bankIban'), value: safeRender(data, 'paymentInfo.bankIban') },
    { label: t('bankBic'), value: safeRender(data, 'paymentInfo.bankBic') },
  ]

  const tabs = [
    {
      eventKey: 'generalInfo',
      title: t('generalInfo'),
      content: (
        <FieldTextView
          fields={detailInfoFields}
          isLoading={isLoading}
          translation="dataManagement.endClients.paymentDetails"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'creditCardInfo',
      title: t('creditCardInfo'),
      content: (
        <FieldTextView
          fields={creditCardFields}
          isLoading={isLoading}
          translation="dataManagement.endClients.paymentDetails"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'bankAddress',
      title: t('bankAddress'),
      content: (
        <FieldTextView
          fields={bankAddressFields}
          isLoading={isLoading}
          translation="dataManagement.endClients.paymentDetails"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle
        title={`${t('paymentDetails')}: ${
          data?.paymentInfo.person
            ? `${data?.paymentInfo.person.firstname} ${data?.paymentInfo.person.lastname}`
            : '-'
        }`}
      />
      <DynamicTabs tabs={tabs} defaultActiveKey="generalInfo" />
    </>
  )
}
