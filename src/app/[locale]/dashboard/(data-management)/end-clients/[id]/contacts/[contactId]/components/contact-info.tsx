import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface ContactInfoProps {
  data: any
  isLoading: boolean
}

export const ContactInfo = ({ data, isLoading }: ContactInfoProps) => {
  const fields = [
    { label: 'Contact Info', value: safeRender(data, 'contactInfo.contactInfo') },
    { label: 'Contact Type', value: safeRender(data, 'contactInfo.contactType.contactType') },
    { label: 'Responsibility', value: safeRender(data, 'responsibility.responsibility') },
    { label: 'Person', value: safeRender(data, 'personId') },
    { label: 'Enterprise Root', value: safeRender(data, 'enterpriseRootId') },
  ]

  return (
    <Page className="pt-5">
      <Row>
        {fields.map(({ label, value }, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={label}
            value={value}
          />
        ))}
      </Row>
    </Page>
  )
}
