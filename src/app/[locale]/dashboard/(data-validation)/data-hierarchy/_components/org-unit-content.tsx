import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { DateWithLabel } from './date-with-label'
import { ContentProps } from './dynamic-drawer.type'
import { PersonDetails } from './person-details'
import { TextWithLabel } from './text-with-label'

export const OrgUnitContent = ({ data }: ContentProps) => {
  const tCommon = useTranslations('common')
  const t = useTranslations('dataValidation.dataHierarchy')

  return (
    <Tabs defaultActiveKey="primaryAddress" id="OrgUnitTabs">
      <Tab eventKey="primaryAddress" title={t('orgUnit.primaryAddress')}>
        <AddressDetails address={data?.primaryAddress} />
      </Tab>
    </Tabs>
  )
}
