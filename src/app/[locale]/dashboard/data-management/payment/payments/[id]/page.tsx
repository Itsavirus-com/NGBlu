'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { DateTimeView } from '@/components/view/date-time-view/date-time-view'
import { TextView } from '@/components/view/text-view/text-view'
import { usePayment } from '@/services/swr/use-payment'

export default function PaymentDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.payments')

  const { data, isLoading } = usePayment(params.id)

  return (
    <>
      <PageTitle title={t('paymentDetails')} />

      <Page title={t('generalInfo')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('personName')}
            value={`${data?.person?.firstname} ${data?.person?.lastname}`}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('paymentType')}
            value={data?.paymentType?.paymentType}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('bankName')}
            value={data?.bankname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('bankIban')}
            value={data?.bankIban}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('bankBic')}
            value={data?.bankBic}
          />
        </Row>
      </Page>

      <Page title={t('creditCardInfo')} className="mt-5">
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('creditCardNumber')}
            value={data?.creditcardNumber}
          />
          <TextView className="my-3" isLoading={isLoading} label={t('ccv')} value={data?.ccv} />
          <DateTimeView
            className="my-3"
            isLoading={isLoading}
            label={t('validTo')}
            value={data?.validTo}
            format="date"
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('creditCardType')}
            value={data?.creditCardType.creditcardType}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('creditCardBrand')}
            value={data?.creditCardBrand.brandname}
          />
        </Row>
      </Page>

      <Page title={t('bankAddress')} className="mt-5">
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.bankAddress?.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.bankAddress?.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.bankAddress?.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.bankAddress?.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.bankAddress?.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.bankAddress?.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.bankAddress?.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.bankAddress?.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.bankAddress?.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.bankAddress?.postalcode}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.bankAddress?.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.bankAddress?.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.bankAddress?.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
