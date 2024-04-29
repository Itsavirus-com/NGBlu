import clsx from 'clsx'

export const Footer = () => {
  return (
    <div className="app-footer" id="kt_app_footer">
      <div
        className={clsx(
          'app-container',
          'container-fluid',
          'd-flex flex-column flex-md-row flex-center flex-md-stack py-3'
        )}
      >
        <div className="text-gray-900 order-2 order-md-1">
          <span className="text-muted fw-semibold me-1">
            {new Date().getFullYear().toString()}&copy;
          </span>
          <a
            href="https://www.ngblunetworks.nl/"
            target="_blank"
            className="text-gray-800 text-hover-primary"
          >
            ngblu networks
          </a>
        </div>
      </div>
    </div>
  )
}
