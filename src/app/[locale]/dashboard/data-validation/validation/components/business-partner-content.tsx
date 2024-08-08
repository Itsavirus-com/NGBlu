import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const BusinessPartnerContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return (
    <Tabs defaultActiveKey="companyInfo" id="businessPartnerTabs">
      <Tab eventKey="companyInfo" title={t('companyInfo.companyInfo')}>
        <TextWithLabel label={t('companyInfo.companyName')} value={data.name} className="mt-5" />
        <TextWithLabel label={t('companyInfo.partnerType')} value={data.businessPartnerType.name} />
        <TextWithLabel
          label={t('companyInfo.companyStatus')}
          value={data.companyInfo?.companyStatus?.status}
        />
        <TextWithLabel label={t('companyInfo.vatNumber')} value={data.companyInfo.vatNumber} />
        <TextWithLabel
          label={t('companyInfo.kvkNumber')}
          value={data.companyInfo.chamberOfCommerceId}
        />
      </Tab>

      {data.companyInfo?.legalAddress && (
        <Tab eventKey="legalAddress" title={t('address.legalAddress')}>
          <TextWithLabel
            className="mt-5"
            label={t('address.addressName')}
            value={data.companyInfo.legalAddress.addressName}
          />
          <TextWithLabel
            label={t('address.streetName')}
            value={data.companyInfo.legalAddress.streetname}
          />
          <TextWithLabel
            label={t('address.houseNumber')}
            value={data.companyInfo.legalAddress.housenumber}
          />
          <TextWithLabel
            label={t('address.houseNumberSuffix')}
            value={data.companyInfo.legalAddress.housenumberSuffix}
          />
          <TextWithLabel
            label={t('address.apartmentNumber')}
            value={data.companyInfo.legalAddress.appartmentNumber}
          />
          <TextWithLabel label={t('address.area')} value={data.companyInfo.legalAddress.area} />
          <TextWithLabel label={t('address.county')} value={data.companyInfo.legalAddress.county} />
          <TextWithLabel label={t('address.city')} value={data.companyInfo.legalAddress.city} />
          <TextWithLabel
            label={t('address.country')}
            value={data.companyInfo.legalAddress.country.name}
          />
          <TextWithLabel
            label={t('address.postalCode')}
            value={data.companyInfo.legalAddress.postalcode}
          />
        </Tab>
      )}

      {data.companyInfo?.postalAddress && (
        <Tab eventKey="profile" title={t('address.postalAddress')}>
          <TextWithLabel
            className="mt-5"
            label={t('address.addressName')}
            value={data.companyInfo.postalAddress.addressName}
          />
          <TextWithLabel
            label={t('address.streetName')}
            value={data.companyInfo.postalAddress.streetname}
          />
          <TextWithLabel
            label={t('address.houseNumber')}
            value={data.companyInfo.postalAddress.housenumber}
          />
          <TextWithLabel
            label={t('address.houseNumberSuffix')}
            value={data.companyInfo.postalAddress.housenumberSuffix}
          />
          <TextWithLabel
            label={t('address.apartmentNumber')}
            value={data.companyInfo.postalAddress.appartmentNumber}
          />
          <TextWithLabel label={t('address.area')} value={data.companyInfo.postalAddress.area} />
          <TextWithLabel
            label={t('address.county')}
            value={data.companyInfo.postalAddress.county}
          />
          <TextWithLabel label={t('address.city')} value={data.companyInfo.postalAddress.city} />
          <TextWithLabel
            label={t('address.country')}
            value={data.companyInfo.postalAddress.country.name}
          />
          <TextWithLabel
            label={t('address.postalCode')}
            value={data.companyInfo.postalAddress.postalcode}
          />
        </Tab>
      )}

      {data.companyInfo?.visitAddress && (
        <Tab eventKey="visitAddress" title={t('address.visitAddress')}>
          <TextWithLabel
            className="mt-5"
            label={t('address.addressName')}
            value={data.companyInfo.visitAddress.addressName}
          />
          <TextWithLabel
            label={t('address.streetName')}
            value={data.companyInfo.visitAddress.streetname}
          />
          <TextWithLabel
            label={t('address.houseNumber')}
            value={data.companyInfo.visitAddress.housenumber}
          />
          <TextWithLabel
            label={t('address.houseNumberSuffix')}
            value={data.companyInfo.visitAddress.housenumberSuffix}
          />
          <TextWithLabel
            label={t('address.apartmentNumber')}
            value={data.companyInfo.visitAddress.appartmentNumber}
          />
          <TextWithLabel label={t('address.area')} value={data.companyInfo.visitAddress.area} />
          <TextWithLabel label={t('address.county')} value={data.companyInfo.visitAddress.county} />
          <TextWithLabel label={t('address.city')} value={data.companyInfo.visitAddress.city} />
          <TextWithLabel
            label={t('address.country')}
            value={data.companyInfo.visitAddress.country.name}
          />
          <TextWithLabel
            label={t('address.postalCode')}
            value={data.companyInfo.visitAddress.postalcode}
          />
        </Tab>
      )}

      {data.companyInfo?.invoiceAddress && (
        <Tab eventKey="invoiceAddress" title={t('address.invoiceAddress')}>
          <TextWithLabel
            className="mt-5"
            label={t('address.addressName')}
            value={data.companyInfo.invoiceAddress.addressName}
          />
          <TextWithLabel
            label={t('address.streetName')}
            value={data.companyInfo.invoiceAddress.streetname}
          />
          <TextWithLabel
            label={t('address.houseNumber')}
            value={data.companyInfo.invoiceAddress.housenumber}
          />
          <TextWithLabel
            label={t('address.houseNumberSuffix')}
            value={data.companyInfo.invoiceAddress.housenumberSuffix}
          />
          <TextWithLabel
            label={t('address.apartmentNumber')}
            value={data.companyInfo.invoiceAddress.appartmentNumber}
          />
          <TextWithLabel label={t('address.area')} value={data.companyInfo.invoiceAddress.area} />
          <TextWithLabel
            label={t('address.county')}
            value={data.companyInfo.invoiceAddress.county}
          />
          <TextWithLabel label={t('address.city')} value={data.companyInfo.invoiceAddress.city} />
          <TextWithLabel
            label={t('address.country')}
            value={data.companyInfo.invoiceAddress.country.name}
          />
          <TextWithLabel
            label={t('address.postalCode')}
            value={data.companyInfo.invoiceAddress.postalcode}
          />
        </Tab>
      )}
    </Tabs>
  )
}
