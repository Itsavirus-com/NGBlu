import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/Page'
import { TextView } from '@/components/view/text-view/TextView'

import { FieldTextViewProps } from './field-text-view.type'

export const FieldTextView = ({
  isLoading,
  title,
  fields,
  translation,
  children,
}: FieldTextViewProps) => {
  const t = useTranslations(translation)

  return (
    <Page title={title || ''} className="pt-5">
      <Row>
        {fields.map(({ label, value, ...props }, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={label}
            value={value}
            {...props}
          />
        ))}
        {children}
      </Row>
    </Page>
  )
}
