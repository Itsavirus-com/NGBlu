import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const ProjectFilter = () => {
  const t = useTranslations('dataManagement.projects')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[projectName]" label={t('projectName')} className="mb-10" />
    </>
  )
}
