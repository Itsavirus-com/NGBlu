import { TableActionsProps } from './table-actions.type'
import { TableColumn } from './table.type'

export type StaticTableBodyProps<TableValues> = {
  columns: TableColumn<TableValues>[]
  data: TableValues[]
} & TableActionsProps
