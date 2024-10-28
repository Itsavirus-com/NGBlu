import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const ProjectInfoFilter = () => {
  const t = useTranslations('dataManagement.projects.infos')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[projectInfo]" label={t('projectInfo')} className="mb-10" />
    </>
  )
}
