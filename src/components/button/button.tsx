import { KTIcon } from '@/components/kt-icon/kt-icon'
import { useTheme } from '@/contexts/ThemeContext'
import { Link } from '@/navigation'

import { ButtonProps } from './button.type'

export const Button = (props: ButtonProps) => {
  const {
    icon,
    label,
    href,
    onClick,
    size = 'sm',
    className,
    colorClass = 'color-primary',
    activeColorClass = 'light-primary',
    iconSize = 'fs-2',
    extraProps = {},
    type = 'button',
  } = props
  const { themeMode } = useTheme()

  const ButtonWrapper = !!href ? Link : 'button'
  const btnIconClass = !label ? 'btn-icon' : 'd-flex align-items-center'
  const color = themeMode === 'dark' ? 'dark' : colorClass

  return (
    <ButtonWrapper
      href={href || ''}
      onClick={onClick}
      type={!href ? type : undefined}
      className={`btn btn-${size} ${className} ${btnIconClass} btn-${color} btn-active-${activeColorClass}`}
      {...extraProps}
    >
      <KTIcon iconName={icon} className={iconSize} />
      {label && <span className="ms-1">{label}</span>}
    </ButtonWrapper>
  )
}
