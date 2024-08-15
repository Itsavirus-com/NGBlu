import { KTIcon } from '@/components/kt-icon/kt-icon'

import { DrawerProps } from './types'

export const Drawer = (props: DrawerProps) => {
  const drawerId = `kt_${props.id}`

  return (
    <div
      id={drawerId}
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="help"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'350px', 'md': '525px', 'lg': '65vw'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle={`#${drawerId}_toggle`}
      data-kt-drawer-close={`#${drawerId}_close`}
    >
      <div className="card shadow-none rounded-0 w-100 h-100">
        <div className="card-header" id={`${drawerId}_header`}>
          {props.title ? (
            <div className="d-flex align-items-center">
              {props.icon && <KTIcon iconName={props.icon} className="fs-2 me-2 text-primary" />}
              {props.dataId && <span className="me-2 badge badge-primary">{props.dataId}</span>}
              <h3 className="card-title fw-bold text-gray-600">{props.title}</h3>
            </div>
          ) : (
            <div />
          )}

          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon explore-btn-dismiss me-n5"
              id={`${drawerId}_close`}
            >
              <KTIcon iconName="cross" className="fs-2" />
            </button>
          </div>
        </div>

        <div className="card-body" id={`${drawerId}_body`}>
          <div
            id={`${drawerId}_scroll`}
            className="hover-scroll-overlay-y"
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers={`#${drawerId}_body`}
            data-kt-scroll-dependencies={`#${drawerId}_header`}
            data-kt-scroll-offset="5px"
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
