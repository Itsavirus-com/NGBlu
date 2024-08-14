import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { DateWithLabel } from './date-with-label'
import { ContentProps } from './dynamic-drawer.type'
import { PersonDetails } from './person-details'
import { TextWithLabel } from './text-with-label'

export const UserContent = ({ data }: ContentProps) => {
  const tCommon = useTranslations('common')
  const t = useTranslations('data_validation.data_hierarchy')

  return (
    <Tabs defaultActiveKey="user" id="userTabs">
      <Tab eventKey="user" title={t('user.user')}>
        <TextWithLabel
          className="mt-5"
          label={t('user.displayName')}
          value={data.user.displayName}
        />
        <TextWithLabel label={t('user.email')} value={data.user.email} />
        <DateWithLabel label={t('user.lastLogin')} value={data.user?.lastLogin} />
        <TextWithLabel
          label={t('user.blocked')}
          value={!!data.user.blockedAt ? tCommon('yes') : tCommon('no')}
        />
      </Tab>

      {data.person && (
        <Tab eventKey="profile" title={t('user.profile')}>
          <PersonDetails person={data.person} />
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
