import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const UserContact = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const fields = [
    { label: t('salutation'), value: safeRender(data, 'person.salutation') },
    { label: t('firstName'), value: safeRender(data, 'person.firstname') },
    { label: t('lastName'), value: safeRender(data, 'person.lastname') },
    { label: t('nameSuffix'), value: safeRender(data, 'person.nameSuffix') },
    { label: t('pronounce'), value: safeRender(data, 'person.pronounce') },
    { label: t('gender'), value: safeRender(data, 'person.gender.gender') },
    { label: t('personType'), value: safeRender(data, 'person.personType.type') },
    { label: t('titles'), value: safeRender(data, 'person.titles') },
    { label: t('department'), value: safeRender(data, 'person.department') },
    { label: t('role'), value: safeRender(data, 'person.role') },
  ]

  return (
    <Page className="pt-5" title={t('personInfo')}>
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
