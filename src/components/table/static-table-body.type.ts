import { TableActionsProps } from './table-actions.type'
import { TableColumn } from './table.type'

export type StaticTableBodyProps<TableValues> = {
  columns: TableColumn<TableValues>[]
  data: TableValues[]
  onDelete?: (rowData: TableValues) => void | Promise<void>
  showDeleteConfirmation?: boolean
} & Omit<TableActionsProps, 'onDelete' | 'showDeleteConfirmation'>
