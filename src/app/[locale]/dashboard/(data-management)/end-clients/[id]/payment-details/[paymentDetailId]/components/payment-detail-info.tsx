import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface PaymentDetailInfoProps {
  data: any
  isLoading: boolean
}

export const PaymentDetailInfo = ({ data, isLoading }: PaymentDetailInfoProps) => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const fields = [
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

  return (
    <Page title={t('generalInfo')} className="pt-5">
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
