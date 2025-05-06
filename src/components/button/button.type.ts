type Size = 'sm' | 'md' | 'lg'

type FontSize =
  | 'fs-1'
  | 'fs-2'
  | 'fs-3'
  | 'fs-4'
  | 'fs-5'
  | 'fs-6'
  | 'fs-7'
  | 'fs-8'
  | 'fs-9'
  | 'fs-10'

type ColorClass =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'
  | 'color-primary'
  | 'color-secondary'
  | 'color-success'
  | 'color-info'
  | 'color-warning'
  | 'color-danger'
  | 'color-light'
  | 'color-dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-info'
  | 'outline-warning'
  | 'outline-danger'
  | 'outline-light'
  | 'outline-dark'
  | 'light-primary'
  | 'light-secondary'
  | 'light-success'
  | 'light-info'
  | 'light-warning'
  | 'light-danger'
  | 'light-dark'

export type ButtonProps = {
  icon?: string
  label?: string
  href?: string
  onClick?: () => void
  size?: Size
  className?: string
  colorClass?: ColorClass
  activeColorClass?: ColorClass
  iconSize?: FontSize
  extraProps?: Record<string, any>
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  onlyIconLoading?: boolean
}
