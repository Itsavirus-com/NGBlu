import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const EnterpriseRootInfo = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const summaryFields = [
    { label: t('name'), value: safeRender(data, 'name') },
    { label: t('addressesCount'), value: safeRender(data, 'addressesCount') },
    { label: t('contactsCount'), value: safeRender(data, 'contactsCount') },
    { label: t('usersCount'), value: safeRender(data, 'usersCount') },
    { label: t('projectsCount'), value: safeRender(data, 'projectsCount') },
    { label: t('customersCount'), value: safeRender(data, 'customersCount') },
    { label: t('businessPartnersCount'), value: safeRender(data, 'businessPartnersCount') },
  ]

  return (
    <Page title={t('enterpriseRootInfo')} className="pt-5">
      <Row>
        {summaryFields.map((field, index) => (
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
