import { ColProps } from 'react-bootstrap'

export const dateTimeFormats = {
  default: 'DD MMM YYYY HH:mm:ss',
  'default-12': 'DD MMM YYYY, hh:mm:ss A',
  date: 'DD MMM YYYY',
  'date-short': 'DD/MM/YYYY',
  'date-with-day': 'ddd, DD MMM YYYY',
  time: 'HH:mm:ss',
  'time-short': 'HH:mm',
  'time-short-12': 'hh:mm A',
}

export type DateTimeViewProps = {
  label?: string
  value?: string
  disableColumn?: boolean
  isLoading?: boolean
  format?: keyof typeof dateTimeFormats
  customEmptyText?: string
} & ColProps
