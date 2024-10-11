import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const ProjectTypesFilter = () => {
  const t = useTranslations('dataManagement.projects.types')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[projectType]" label={t('type')} className="mb-10" />
    </>
  )
}
