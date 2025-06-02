import clsx from 'clsx'

import { Navbar } from './Navbar'

export function Header() {
  return (
    <div id="kt_app_header" className="app-header">
      <div
        id="kt_app_header_container"
        className={clsx(
          'app-container',
          'container-fluid',
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        <div />
        <Navbar />
      </div>
    </div>
  )
}
