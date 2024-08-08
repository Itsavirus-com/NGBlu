import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const ContactContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return (
    <Tabs defaultActiveKey="profile" id="contactTabs">
      <Tab eventKey="profile" title={t('contact.profile')}>
        <TextWithLabel
          label={t('contact.firstName')}
          value={data.person.firstname}
          className="mt-5"
        />
        <TextWithLabel label={t('contact.lastName')} value={data.person.lastname} />
        <TextWithLabel label={t('contact.nameSuffix')} value={data.person.nameSuffix} />
        <TextWithLabel label={t('contact.namePrefix')} value={data.person.namePrefix} />
        <TextWithLabel label={t('contact.titles')} value={data.person.titles} />
        <TextWithLabel label={t('contact.gender')} value={data.person.gender.gender} />
        <TextWithLabel label={t('contact.department')} value={data.person.department} />
        <TextWithLabel label={t('contact.personType')} value={data.person?.personType?.type} />
      </Tab>

      {data.responsibility && (
        <Tab eventKey="responsibility" title={t('contact.responsibility')}>
          <TextWithLabel
            className="mt-5"
            label={t('contact.responsibility')}
            value={data.responsibility?.responsibility}
          />
        </Tab>
      )}

      {data.contactInfo && (
        <Tab eventKey="contactInfo" title={t('contact.contactInfo')}>
          <TextWithLabel
            className="mt-5"
            label={t('contact.contactInfo')}
            value={data.contactInfo?.contactInfo}
          />
          <TextWithLabel
            label={t('contact.contactType')}
            value={data.contactInfo?.contactType?.contactType}
          />
        </Tab>
      )}
    </Tabs>
  )
}
