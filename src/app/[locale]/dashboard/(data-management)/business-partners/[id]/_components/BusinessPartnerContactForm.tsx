'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Contact } from '@/services/swr/models/contact.type'
import { PersonResponsibility } from '@/services/swr/models/person-responsibility.type'
import { Person } from '@/services/swr/models/person.type'

interface BusinessPartnerContactFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function BusinessPartnerContactForm({
  methods,
  onSubmit,
  isSubmitting,
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
              apiPath={'persons'}
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<Contact>
              label={t('contactInfo')}
              name="contactInfoId"
              containerClass="mb-3"
              apiPath={'contacts'}
              option={{ label: row => row.contactName, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<PersonResponsibility>
              label={t('responsibility')}
              name="responsibilityId"
              containerClass="mb-3"
              apiPath={'person-responsibilities'}
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
