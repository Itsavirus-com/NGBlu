import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface CompanyInfoProps {
  data: any
  isLoading: boolean
}

export const CompanyInfo = ({ data, isLoading }: CompanyInfoProps) => {
  const t = useTranslations('dataManagement.companies')

  const fields = [
    { label: t('name'), value: safeRender(data, 'companyname') },
    { label: t('status'), value: safeRender(data, 'companyStatus.status') },
    { label: t('vatNumber'), value: safeRender(data, 'vatNumber') },
    { label: t('kvkNumber'), value: safeRender(data, 'chamberOfCommerceId') },
  ]

  return (
    <Page title={t('companyInfo')} className="pt-5">
      <Row>
        {fields.map(({ label, value }, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={label}
            value={value}
          />
        ))}
      </Row>
    </Page>
  )
}
