import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface ProjectInfoProps {
  data: any
  isLoading: boolean
}

export const ProjectInfo = ({ data, isLoading }: ProjectInfoProps) => {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const fields = [
    { label: t('projectName'), value: safeRender(data, 'project.projectName'), lg: 6 },
    { label: t('projectType'), value: safeRender(data, 'project.projectType.projectType'), lg: 6 },
    {
      label: t('projectInfo'),
      value: safeRender(data, 'project.projectInfo.projectInfo'),
      md: 12,
      lg: 12,
    },
  ]

  return (
    <Page className="pt-5">
      <Row>
        {fields.map(({ label, value, ...props }, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={label}
            value={value}
            {...props}
          />
        ))}
      </Row>
    </Page>
  )
}
