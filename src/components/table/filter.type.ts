import { ReactNode } from 'react'

export type FilterProps = {
  children?: ReactNode
  onFilter?: (filters: Record<string, any>) => void
}
