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
  onDelete?: () => void
  queryParams?: Record<string, string>
  rowData?: any
}
