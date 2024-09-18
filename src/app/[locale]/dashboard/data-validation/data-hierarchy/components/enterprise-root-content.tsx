import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const EnterpriseRootContent = ({ data }: ContentProps) => {
  const t = useTranslations('dataValidation.dataHierarchy')

  return (
    <Tabs defaultActiveKey="companyInfo" id="enterpriseRootTabs">
      <Tab eventKey="companyInfo" title={t('companyInfo.companyInfo')}>
        <TextWithLabel label={t('companyInfo.companyName')} value={data.name} className="mt-5" />
      </Tab>

      {data.enterpriseRootAddresses && (
        <Tab eventKey="address" title={t('address.address')}>
          <AddressDetails
            address={data.enterpriseRootAddresses.address}
            addressType={data.enterpriseRootAddresses.addressType}
          />
        </Tab>
      )}
    </Tabs>
  )
}
