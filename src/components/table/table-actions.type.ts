import { ButtonProps } from '@/components/button/button.type'

export type Action = 'view' | 'edit' | 'delete'

export type TableActionsHeadProps = {
  actions?: Action[]
  customActions?: ButtonProps[] | ((rowData?: any) => ButtonProps[])
}

export type TableActionsProps = TableActionsHeadProps & {
  actionBasePath?: string
  dataId?: number
  apiPath?: string
  onDelete?: (rowData?: any, dataId?: number) => void | Promise<void>
  showDeleteConfirmation?: boolean
  queryParams?: Record<string, string>
  rowData?: any
}
