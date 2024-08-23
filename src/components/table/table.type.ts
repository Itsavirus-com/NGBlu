import { ReactNode } from 'react'

import { ButtonProps } from '@/components/button/button.type'

import { TableBodyProps } from './table-body.type'

export type TableProps<TableValues> = {
  title: string
  description?: string
  toolbars?: ButtonProps[]
  filters?: ReactNode
} & TableBodyProps<TableValues>
