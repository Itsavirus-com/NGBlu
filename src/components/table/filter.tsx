import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/button/button'

import { FilterProps } from './filter.type'

export const Filter = ({ children, onFilter }: FilterProps) => {
  const t = useTranslations('common.table')

  const methods = useForm({ defaultValues: {} })

  return (
    <FormProvider {...methods}>
      <form
        className={!children ? 'd-none' : ''}
        onSubmit={onFilter && methods.handleSubmit(onFilter)}
        onReset={() => onFilter && onFilter({})}
      >
        <Button
          icon="category"
          className="ms-2"
          extraProps={{
            'data-kt-menu-trigger': 'click',
            'data-kt-menu-placement': 'bottom-end',
            'data-kt-menu-flip': 'top-end',
          }}
        />

        <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true">
          <div className="px-7 py-5">
            <div className="fs-5 text-gray-900 fw-bolder">{t('filterOptions')}</div>
          </div>

          <div className="separator border-gray-200"></div>

          <div className="px-7 py-5">
            {children}

            <div className="d-flex justify-content-end">
              <Button
                type="reset"
                icon="cross-square"
                iconSize="fs-3"
                className="me-2"
                colorClass="light"
                activeColorClass="light-primary"
                extraProps={{
                  'data-kt-menu-dismiss': 'true',
                }}
                label={t('reset')}
              />

              <Button
                type="submit"
                icon="check-square"
                iconSize="fs-3"
                className="me-2"
                colorClass="primary"
                extraProps={{
                  'data-kt-menu-dismiss': 'true',
                }}
                label={t('apply')}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
