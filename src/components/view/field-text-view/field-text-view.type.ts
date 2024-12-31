import { TextViewProps } from '../text-view/text-view.type'

export type FieldTextViewProps = {
  data: any
  isLoading: boolean
  title: string
  fields: TextViewProps[]
  translation: string
}
