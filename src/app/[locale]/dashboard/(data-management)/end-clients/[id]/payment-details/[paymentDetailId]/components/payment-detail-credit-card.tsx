import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { DateTimeView } from '@/components/view/date-time-view/date-time-view'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface PaymentDetailCreditCardProps {
  data: any
  isLoading: boolean
}

export const PaymentDetailCreditCard = ({ data, isLoading }: PaymentDetailCreditCardProps) => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const fields = [
    { label: t('creditCardNumber'), value: safeRender(data, 'paymentInfo.creditcardNumber') },
    { label: t('ccv'), value: safeRender(data, 'paymentInfo.ccv') },
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

  return (
    <Page title={t('creditCardInfo')} className="pt-5">
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
