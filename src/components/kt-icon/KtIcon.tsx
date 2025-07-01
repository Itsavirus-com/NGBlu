import { FC } from 'react'

import icons from './icons'

type Props = {
  className?: string
  iconType?: 'duotone' | 'solid' | 'outline'
  iconName: string
  role?: string
  onClick?: () => void
}

const KTIcon: FC<Props> = ({ className = '', iconType = 'outline', iconName, role, onClick }) => {
  return (
    <i
      className={`ki-${iconType} ki-${iconName}${className && ' ' + className}`}
      role={role}
      onClick={onClick}
    >
      {iconType === 'duotone' &&
        [...Array(icons[iconName])].map((_e, i) => {
          return (
            <span
              key={`${iconType}-${iconName}-${className}-path-${i + 1}`}
              className={`path${i + 1}`}
            ></span>
          )
        })}
    </i>
  )
}

export { KTIcon }
