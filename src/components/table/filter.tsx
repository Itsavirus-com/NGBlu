import { useTranslations } from 'next-intl'

import { FilterProps } from './filter.type'
import { ToolbarButton } from './toolbar-button'

export const Filter = ({ children }: FilterProps) => {
  const t = useTranslations('common.table')

  return (
    <div className={!children ? 'd-none' : ''}>
      <ToolbarButton
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
            <button
              type="reset"
              className="btn btn-sm btn-light btn-active-light-primary me-2"
              data-kt-menu-dismiss="true"
            >
              {t('reset')}
            </button>

            <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">
              {t('apply')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
