import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'
import { PersonDetails } from './person-details'
import { TextWithLabel } from './text-with-label'

export const CustomerContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.data_hierarchy')

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
        <Tab eventKey="address" title={t('customer.address')}>
          <AddressDetails address={data.endclient.locationAddress} />
        </Tab>
      )}

      {data.enterpriseRootAddresses && (
        <Tab eventKey="rootAddress" title={t('customer.rootAddress')}>
          <AddressDetails
            address={data.enterpriseRootAddresses.address}
            addressType={data.enterpriseRootAddresses.addressType}
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
