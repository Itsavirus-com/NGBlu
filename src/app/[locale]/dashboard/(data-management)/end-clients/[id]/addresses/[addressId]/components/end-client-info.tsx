import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface AddressInfoProps {
  data: any
  isLoading: boolean
}

export const AddressInfo = ({ data, isLoading }: AddressInfoProps) => {
  const fields = [
    { label: 'Address Name', value: safeRender(data, 'address.addressName') },
    { label: 'Street Name', value: safeRender(data, 'address.streetname') },
    { label: 'House Number Suffix', value: safeRender(data, 'address.housenumberSuffix') },
    { label: 'House Number', value: safeRender(data, 'address.housenumber') },
    { label: 'Apartment Number', value: safeRender(data, 'address.appartmentNumber') },
    { label: 'Area', value: safeRender(data, 'address.area') },
    { label: 'County', value: safeRender(data, 'address.county') },
    { label: 'City', value: safeRender(data, 'address.city') },
    { label: 'Country', value: safeRender(data, 'address.country.name') },
    { label: 'Postal Code', value: safeRender(data, 'address.postalcode') },
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
