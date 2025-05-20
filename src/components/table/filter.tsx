import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/button/button'

import { FilterProps } from './filter.type'

export const Filter = ({ children, onFilter }: FilterProps) => {
  const t = useTranslations('common.table')
  const methods = useForm({ defaultValues: {} })
  const [isOpen, setIsOpen] = useState(false)

  // Handler for form submission
  const handleFilterSubmit = (data: Record<string, any>) => {
    // const sanitizedData = sanitizeFilterValues(data)

    if (onFilter) {
      onFilter(data)
    }
  }

  // Add a reset handler to log reset action
  const handleReset = () => {
    console.log('Filter reset - clearing all values')
    if (onFilter) {
      onFilter({})
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={!children ? 'd-none' : ''}
        onSubmit={onFilter && methods.handleSubmit(handleFilterSubmit)}
        onReset={handleReset}
      >
        <Button
          icon="filter"
          className="ms-2"
          onClick={() => setIsOpen(!isOpen)}
          label={t('filter')}
          colorClass="light-primary"
        />

        <div
          className={`menu menu-sub menu-sub-dropdown w-250px w-md-300px ${isOpen ? 'show' : ''}`}
          style={{
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            right: 0,
            zIndex: 105,
          }}
        >
          <div className="px-7 py-5">
            <div className="fs-5 text-gray-900 fw-bolder">{t('filterOptions')}</div>
          </div>

          <div className="separator border-gray-200"></div>

          <div className="px-7 py-5">
            {children}

            <div className="d-flex justify-content-end mt-5">
              <Button
                type="reset"
                icon="cross-square"
                iconSize="fs-3"
                className="me-2"
                colorClass="light"
                activeColorClass="light-primary"
                onClick={() => setIsOpen(false)}
                label={t('reset')}
              />

              <Button
                type="submit"
                icon="check-square"
                iconSize="fs-3"
                className="me-2"
                colorClass="primary"
                onClick={() => setIsOpen(false)}
                label={t('apply')}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
