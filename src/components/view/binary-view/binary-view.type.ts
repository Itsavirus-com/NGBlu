import { ColProps } from 'react-bootstrap'

export type BinaryViewProps = {
  label?: string
  value?: boolean
  disableColumn?: boolean
  isLoading?: boolean
  trueLabel?: string
  falseLabel?: string
} & ColProps
