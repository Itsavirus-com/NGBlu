import { Button } from 'react-bootstrap'

import { PageProps } from './page.type'

export const Page = (props: PageProps) => {
  const { children, className, title, description, toolbars } = props
  const hasHeader = !!title || !!description || toolbars

  return (
    <div className={`app-container container-fluid ${className}`}>
      <div className="card card-xxl-stretch">
        {hasHeader && (
          <div className="card-header border-0 pt-3">
            <h3 className="card-title align-items-start flex-column">
              {title && <span className="card-label fw-bold fs-3 mb-1">{title}</span>}
              {description && <span className="text-muted fw-semibold fs-7">{description}</span>}
            </h3>

            {toolbars && (
              <div className="card-toolbar">
                {toolbars?.map((toolbar, index) => <Button key={index} {...toolbar} />)}
              </div>
            )}
          </div>
        )}
        <div className="card-body py-5">{children}</div>
      </div>
    </div>
  )
}
