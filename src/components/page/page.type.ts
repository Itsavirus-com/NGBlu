import { ReactNode } from 'react'
import { ButtonProps } from 'react-bootstrap'

export type PageProps = {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  toolbars?: ButtonProps[]
}
