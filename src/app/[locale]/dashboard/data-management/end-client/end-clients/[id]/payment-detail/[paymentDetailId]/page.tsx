'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { DateTimeView } from '@/components/view/date-time-view/date-time-view'
import { TextView } from '@/components/view/text-view/text-view'
import { useEndClientPaymentDetail } from '@/services/swr/use-end-client-payment-detail'

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

  return (
    <>
      <PageTitle title={t('title')} />

      <Page title={t('generalInfo')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('personName')}
            value={
              data?.paymentInfo.person
                ? `${data?.paymentInfo.person.firstname} ${data?.paymentInfo.person.lastname}`
                : '-'
            }
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('paymentType')}
            value={data?.paymentInfo.paymentType?.paymentType}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('bankName')}
            value={data?.paymentInfo.bankname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('bankIban')}
            value={data?.paymentInfo.bankIban}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('bankBic')}
            value={data?.paymentInfo.bankBic}
          />
        </Row>
      </Page>

      <Page title={t('creditCardInfo')} className="mt-5">
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('creditCardNumber')}
            value={data?.paymentInfo.creditcardNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('ccv')}
            value={data?.paymentInfo.ccv}
          />
          <DateTimeView
            className="my-3"
            isLoading={isLoading}
            label={t('validTo')}
            value={data?.paymentInfo.validTo}
            format="date"
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('creditCardType')}
            value={data?.paymentInfo.creditCardType.creditcardType}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('creditCardBrand')}
            value={data?.paymentInfo.creditCardBrand.brandname}
          />
        </Row>
      </Page>

      <Page title={t('bankAddress')} className="mt-5">
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.paymentInfo.bankAddress?.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.paymentInfo.bankAddress?.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.paymentInfo.bankAddress?.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.paymentInfo.bankAddress?.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.paymentInfo.bankAddress?.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.paymentInfo.bankAddress?.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.paymentInfo.bankAddress?.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.paymentInfo.bankAddress?.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.paymentInfo.bankAddress?.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.paymentInfo.bankAddress?.postalcode}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.paymentInfo.bankAddress?.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.paymentInfo.bankAddress?.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.paymentInfo.bankAddress?.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
