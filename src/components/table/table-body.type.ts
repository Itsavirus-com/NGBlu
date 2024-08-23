import { ReactNode } from 'react'

import { TableActionsProps } from './table-actions.type'

export type TableColumn<TableValues> = {
  id: string
  title: ReactNode
  headClassName?: string
  bodyClassName?: string
  render?: (value: TableValues) => ReactNode
}

export type TableBodyProps<TableValues> = {
  columns: TableColumn<TableValues>[]
  apiPath: string
} & TableActionsProps
