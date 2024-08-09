import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'
import { PersonDetails } from './person-details'
import { TextWithLabel } from './text-with-label'

export const ContactContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return (
    <Tabs defaultActiveKey="profile" id="contactTabs">
      <Tab eventKey="profile" title={t('contact.profile')}>
        <PersonDetails person={data.person} />
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

      {data?.ouUnit && (
        <Tab eventKey="orgUnit" title={t('orgUnit.title')}>
          <TextWithLabel className="mt-5" label={t('orgUnit.name')} value={data.ouUnit?.name} />
        </Tab>
      )}

      {data?.ouUnit?.primaryAddress && (
        <Tab eventKey="orgUnitAddress" title={t('orgUnit.orgUnitAddress')}>
          <AddressDetails address={data.ouUnit?.primaryAddress} />
        </Tab>
      )}
    </Tabs>
  )
}
