import clsx from 'clsx'

import { Link } from '@/navigation'

import { PageTitleProps } from './types'

export const PageTitle = (props: PageTitleProps) => {
  const { title, description, breadcrumbs } = props

  return (
    <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
      <div
        id="kt_app_toolbar_container"
        className="app-container d-flex flex-stack container-fluid"
      >
        <div
          id="kt_page_title"
          data-kt-swapper="true"
          data-kt-swapper-mode="prepend"
          data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
          className="page-title d-flex flex-wrap me-3 flex-column justify-content-center"
        >
          <h1
            className={clsx(
              'page-heading d-flex text-gray-900 fw-bold fs-3 my-0',
              'flex-column justify-content-center'
            )}
          >
            {title}

            {description && (
              <span className={clsx('page-desc text-muted fs-7 fw-semibold', 'pt-2')}>
                {description}{' '}
              </span>
            )}
          </h1>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <>
              <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
                {Array.from(breadcrumbs).map((item, index) => (
                  <li
                    className={clsx('breadcrumb-item', {
                      'text-gray-900': !item.isSeparator && item.isActive,
                      'text-muted': !item.isSeparator && !item.isActive,
                    })}
                    key={`${item.path}${index}`}
                  >
                    {!item.isSeparator ? (
                      <Link className="text-muted text-hover-primary" href={item.path}>
                        {item.title}
                      </Link>
                    ) : (
                      <span className="bullet bg-gray-500 w-5px h-2px"></span>
                    )}
                  </li>
                ))}
                <li className="breadcrumb-item text-gray-900">{title}</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
