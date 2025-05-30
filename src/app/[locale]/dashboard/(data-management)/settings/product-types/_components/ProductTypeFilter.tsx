import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const ProductTypesFilter = () => {
  const t = useTranslations('dataManagement.products.types')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[productType]" label={t('type')} className="mb-10" />
    </>
  )
}
