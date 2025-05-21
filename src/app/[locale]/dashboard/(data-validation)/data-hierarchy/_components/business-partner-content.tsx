import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const BusinessPartnerContent = ({ data }: ContentProps) => {
  const t = useTranslations('dataValidation.dataHierarchy')

  return (
    <Tabs defaultActiveKey="companyInfo" id="businessPartnerTabs">
      <Tab eventKey="companyInfo" title={t('companyInfo.companyInfo')}>
        <TextWithLabel label={t('companyInfo.companyName')} value={data?.name} className="mt-5" />
        <TextWithLabel
          label={t('companyInfo.partnerType')}
          value={data?.businesspartnerType?.name}
        />
        <TextWithLabel
          label={t('companyInfo.companyStatus')}
          value={data?.companyInfo?.companyStatus?.status}
        />
        <TextWithLabel label={t('companyInfo.vatNumber')} value={data?.companyInfo?.vatNumber} />
        <TextWithLabel
          label={t('companyInfo.kvkNumber')}
          value={data?.companyInfo?.chamberOfCommerceId}
        />
      </Tab>

      {data?.companyInfo?.legalAddress && (
        <Tab eventKey="legalAddress" title={t('address.legalAddress')}>
          <AddressDetails address={data?.companyInfo?.legalAddress} />
        </Tab>
      )}

      {data?.companyInfo?.postalAddress && (
        <Tab eventKey="postalAddress" title={t('address.postalAddress')}>
          <AddressDetails address={data?.companyInfo?.postalAddress} />
        </Tab>
      )}

      {data?.companyInfo?.visitAddress && (
        <Tab eventKey="visitAddress" title={t('address.visitAddress')}>
          <AddressDetails address={data?.companyInfo?.visitAddress} />
        </Tab>
      )}

      {data?.companyInfo?.invoiceAddress && (
        <Tab eventKey="invoiceAddress" title={t('address.invoiceAddress')}>
          <AddressDetails address={data?.companyInfo?.invoiceAddress} />
        </Tab>
      )}
    </Tabs>
  )
}
