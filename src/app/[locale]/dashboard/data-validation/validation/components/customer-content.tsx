import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'
import { PersonDetails } from './person-details'
import { TextWithLabel } from './text-with-label'

export const CustomerContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return (
    <Tabs defaultActiveKey="profile" id="customerTabs">
      <Tab eventKey="profile" title={t('customer.profile')}>
        <TextWithLabel label={t('customer.name')} value={data.endclient.name} className="mt-5" />
        <TextWithLabel label={t('customer.type')} value={data.endclient.type} />
        <TextWithLabel
          label={t('customer.status')}
          value={data.endclient?.endClientStatus?.status}
        />
        <TextWithLabel label={t('customer.accountNumber')} value={data.endclient.accountNumber} />
        <TextWithLabel label={t('customer.referenceId')} value={data.endclient.referenceId} />
        <TextWithLabel label={t('customer.afasId')} value={data.endclient.afasId} />
      </Tab>

      {data.endclient?.person && (
        <Tab eventKey="contactPerson" title={t('customer.contactPerson')}>
          <PersonDetails person={data.endclient.person} />
        </Tab>
      )}

      {data.endclient?.locationAddress && (
        <Tab eventKey="location" title={t('customer.location')}>
          <AddressDetails address={data.endclient.locationAddress} />
        </Tab>
      )}

      {data?.ouUnit && (
        <Tab eventKey="organizationUnit" title={t('customer.organizationUnit')}>
          <TextWithLabel
            className="mt-5"
            label={t('customer.ouUnit.name')}
            value={data.ouUnit?.name}
          />

          <h4 className="text-gray-900 fw-bold fs-4 mt-8">{t('customer.ouUnit.primaryAddress')}</h4>
          <AddressDetails address={data.ouUnit.primaryAddress} />
        </Tab>
      )}
    </Tabs>
  )
}
