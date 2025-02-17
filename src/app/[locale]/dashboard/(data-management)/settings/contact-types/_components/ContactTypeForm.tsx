'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { ContactType } from '@/services/swr/models/contact-type.type'

interface ContactTypeFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function ContactTypeForm({ methods, onSubmit }: ContactTypeFormProps) {
  const t = useTranslations('dataManagement.contactTypes')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('type')}
              name="contactType"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />

            <ControlledSelect<ContactType>
              label={t('parent')}
              name="parentId"
              containerClass="mb-3"
              apiPath="contacts/types"
              option={{ label: row => row.contactType, value: row => row.id }}
            />
            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
