import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const EnterpriseRootContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return (
    <Tabs defaultActiveKey="companyInfo" id="enterpriseRootTabs">
      <Tab eventKey="companyInfo" title={t('companyInfo.companyInfo')}>
        <TextWithLabel label={t('companyInfo.companyName')} value={data.name} className="mt-5" />
      </Tab>

      {data.enterpriseRootAddresses && (
        <Tab eventKey="address" title={t('address.address')}>
          <TextWithLabel
            className="mt-5"
            label={t('address.addressName')}
            value={data.enterpriseRootAddresses.address.addressName}
          />
          <TextWithLabel
            label={t('address.addressType')}
            value={data.enterpriseRootAddresses.addressType.addressType}
          />
          <TextWithLabel
            label={t('address.streetName')}
            value={data.enterpriseRootAddresses.address.streetname}
          />
          <TextWithLabel
            label={t('address.houseNumber')}
            value={data.enterpriseRootAddresses.address.housenumber}
          />
          <TextWithLabel
            label={t('address.houseNumberSuffix')}
            value={data.enterpriseRootAddresses.address.housenumberSuffix}
          />
          <TextWithLabel
            label={t('address.apartmentNumber')}
            value={data.enterpriseRootAddresses.address.appartmentNumber}
          />
          <TextWithLabel
            label={t('address.area')}
            value={data.enterpriseRootAddresses.address.area}
          />
          <TextWithLabel
            label={t('address.county')}
            value={data.enterpriseRootAddresses.address.county}
          />
          <TextWithLabel
            label={t('address.city')}
            value={data.enterpriseRootAddresses.address.city}
          />
          <TextWithLabel
            label={t('address.country')}
            value={data.enterpriseRootAddresses.address.country.name}
          />
          <TextWithLabel
            label={t('address.postalCode')}
            value={data.enterpriseRootAddresses.address.postalcode}
          />
        </Tab>
      )}
    </Tabs>
  )
}
