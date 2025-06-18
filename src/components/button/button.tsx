import { Spinner } from 'react-bootstrap'

import { KTIcon } from '@/components/kt-icon/kt-icon'
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
    loading = false,
    disabled = false,
    onlyIconLoading = false,
    iconClassName,
  } = props

  const ButtonWrapper = !!href ? Link : 'button'
  const btnIconClass = !label ? 'btn-icon' : 'd-flex align-items-center'

  return (
    <ButtonWrapper
      href={href || ''}
      onClick={onClick}
      type={!href ? type : undefined}
      disabled={disabled}
      className={`btn btn-${size} d-flex justify-content-center ${className} ${btnIconClass} btn-${colorClass} btn-active-${activeColorClass}`}
      {...extraProps}
    >
      {loading ? (
        <>
          <Spinner size="sm" animation="border" />
          {!onlyIconLoading && <span className="ms-1"> Loading...</span>}
        </>
      ) : (
        <>
          {icon && <KTIcon iconName={icon} className={`${iconSize} ${iconClassName}`} />}
          {label && <span className="ms-1">{label}</span>}
        </>
      )}
    </ButtonWrapper>
  )
}
