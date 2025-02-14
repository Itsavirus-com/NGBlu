'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { ContactType } from '@/services/swr/models/contact-type.type'
import { Person } from '@/services/swr/models/person.type'

interface BusinessPartnerContactFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function BusinessPartnerContactForm({
  methods,
  onSubmit,
}: BusinessPartnerContactFormProps) {
  const t = useTranslations('dataManagement.businessPartners.contacts')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Person>
              label={t('person')}
              name="personId"
              containerClass="mb-3"
              apiPath="persons"
              option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<ContactType>
              label={t('contactType')}
              name="contactTypeId"
              containerClass="mb-3"
              apiPath="contacts/types"
              option={{ label: row => row.contactType, value: row => row.id }}
              isRequired
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
