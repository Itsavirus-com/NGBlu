import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'

interface BusinessPartnerInfoProps {
  data: any
  isLoading: boolean
}

export const BusinessPartnerInfo = ({ data, isLoading }: BusinessPartnerInfoProps) => {
  const t = useTranslations('dataManagement.businessPartners')

  const fields = [
    { label: t('name'), value: data?.name },
    { label: t('company'), value: data?.companyInfo?.companyname },
    { label: t('type'), value: data?.businessPartnerType?.name },
    { label: t('addressCount'), value: data?.businessPartnerAddressesCount || 0 },
    { label: t('contactCount'), value: data?.businessPartnerContactsCount || 0 },
    { label: t('customerCount'), value: data?.businessPartnerCustomersCount || 0 },
    { label: t('projectCount'), value: data?.businessPartnerProjectsCount || 0 },
    { label: t('userCount'), value: data?.businessPartnerUsersCount || 0 },
  ]

  return (
    <Page title={t('businessPartnerInfo')} className="pt-5">
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
