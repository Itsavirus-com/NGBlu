import clsx from 'clsx'
import React from 'react'

import { KTIcon } from '@/components/kt-icon/KtIcon'
import { usePathname } from '@/navigation'
import { WithChildren } from '@/types'

import { checkIsActive } from './helper'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  to,
  children,
  title,
  icon,
  hasBullet,
}) => {
  const pathname = usePathname()
  const isActive = checkIsActive(pathname, to)

  return (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger="click"
    >
      <span className="menu-link">
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}

        {icon && (
          <span className="menu-icon">
            <KTIcon iconName={icon} className="fs-2" />
          </span>
        )}

        <span className="menu-title">{title}</span>
        <span className="menu-arrow"></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  )
}

export { SidebarMenuItemWithSub }
