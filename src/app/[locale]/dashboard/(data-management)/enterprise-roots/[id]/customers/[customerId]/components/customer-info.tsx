import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const CustomerInfo = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const fields = [
    { label: t('name'), value: safeRender(data, 'endclient.name') },
    { label: t('type'), value: safeRender(data, 'endclient.type.type') },
    { label: t('status'), value: safeRender(data, 'endclient.status.status') },
    { label: t('accountNumber'), value: safeRender(data, 'endclient.accountNumber') },
    { label: t('referenceId'), value: safeRender(data, 'endclient.referenceId') },
    { label: t('afasId'), value: safeRender(data, 'endclient.afasId') },
  ]

  return (
    <Page title={t('endClientInfo')} className="pt-5">
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
