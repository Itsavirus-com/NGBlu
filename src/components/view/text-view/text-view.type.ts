import { ColProps } from 'react-bootstrap'

export type TextViewProps = {
  label?: string
  value?: string | number
  disableColumn?: boolean
  isLoading?: boolean
} & ColProps
