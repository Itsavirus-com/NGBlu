import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { KTIcon } from '@/components/kt-icon/kt-icon'
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

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  hasBullet = false,
}) => {
  const pathname = usePathname()
  const isActive = checkIsActive(pathname, to)

  return (
    <div className="menu-item">
      <Link className={clsx('menu-link without-sub', { active: isActive })} href={to}>
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}

        {icon && (
          <span className="menu-icon">
            {' '}
            <KTIcon iconName={icon} className="fs-2" />
          </span>
        )}

        <span className="menu-title">{title}</span>
      </Link>
      {children}
    </div>
  )
}

export { SidebarMenuItem }
