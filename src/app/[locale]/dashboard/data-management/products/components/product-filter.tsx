import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const ProductFilter = () => {
  const t = useTranslations('dataManagement.products')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-10" />
    </>
  )
}
