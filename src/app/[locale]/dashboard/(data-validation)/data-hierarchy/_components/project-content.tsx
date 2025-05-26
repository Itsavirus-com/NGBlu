import { useTranslations } from 'next-intl'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const ProjectContent = ({ data }: ContentProps) => {
  const t = useTranslations('dataValidation.dataHierarchy')

  return (
    <Tabs defaultActiveKey="generalInfo" id="projectTabs">
      <Tab eventKey="generalInfo" title={t('project.generalInfo')}>
        <TextWithLabel
          className="mt-5"
          label={t('project.projectName')}
          value={data?.project?.projectName}
        />
        <TextWithLabel
          label={t('project.projectType')}
          value={data?.project?.projectType?.projectType}
        />
        <TextWithLabel
          label={t('project.description')}
          value={data.project?.projectInfo?.projectInfo}
        />
      </Tab>

      {data?.project?.address && (
        <Tab eventKey="location" title={t('project.location')}>
          <AddressDetails address={data?.project?.address} />
        </Tab>
      )}

      {data?.ouUnit && (
        <Tab eventKey="orgUnit" title={t('orgUnit.title')}>
          <TextWithLabel className="mt-5" label={t('orgUnit.name')} value={data?.ouUnit?.name} />
        </Tab>
      )}

      {data?.ouUnit?.primaryAddress && (
        <Tab eventKey="orgUnitAddress" title={t('orgUnit.orgUnitAddress')}>
          <AddressDetails address={data?.ouUnit?.primaryAddress} />
        </Tab>
      )}
    </Tabs>
  )
}
