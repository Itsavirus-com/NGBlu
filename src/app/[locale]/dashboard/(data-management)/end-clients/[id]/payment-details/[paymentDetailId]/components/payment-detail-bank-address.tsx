import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface PaymentDetailBankAddressProps {
  data: any
  isLoading: boolean
}

export const PaymentDetailBankAddress = ({ data, isLoading }: PaymentDetailBankAddressProps) => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const fields = [
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

  return (
    <Page title={t('bankAddress')} className="pt-5">
      <Row>
        {fields.map((field, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={field.label}
            value={field.value}
          />
        ))}
      </Row>
    </Page>
  )
}
