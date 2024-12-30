import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const ContactInfo = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const fields = [
    { label: t('contactInfo'), value: safeRender(data, 'contactInfo.contactInfo') },
    { label: t('contactType'), value: safeRender(data, 'contactInfo.contactType.contactType') },
    { label: t('responsibility'), value: safeRender(data, 'responsibility.responsibility') },
    { label: t('person'), value: safeRender(data, 'personId') },
    { label: t('enterpriseRoot'), value: safeRender(data, 'enterpriseRootId') },
    { label: t('organisationUnit'), value: safeRender(data, 'ouUnitId') },
  ]

  return (
    <Page title={t('contactInfo')} className="pt-5">
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
