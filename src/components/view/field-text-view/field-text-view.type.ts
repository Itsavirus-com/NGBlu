import { TextViewProps } from '../text-view/text-view.type'

export type FieldTextViewProps = {
  isLoading: boolean
  title?: string
  fields: TextViewProps[]
  translation: string
}
