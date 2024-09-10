import { TableActionsProps } from './table-actions.type'
import { TableColumn } from './table.type'

export type DynamicTableBodyProps<TableValues> = {
  columns: TableColumn<TableValues>[]
  apiPath: string
  filters?: Record<string, any>
  defaultFilters?: Record<string, any>
} & TableActionsProps
