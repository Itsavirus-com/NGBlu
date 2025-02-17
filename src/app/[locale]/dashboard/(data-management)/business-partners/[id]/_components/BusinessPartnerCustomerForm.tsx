'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { EndClient } from '@/services/swr/models/end-client.type'

interface BusinessPartnerCustomerFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function BusinessPartnerCustomerForm({
  methods,
  onSubmit,
}: BusinessPartnerCustomerFormProps) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<EndClient>
              label={t('endClient')}
              name="endclientId"
              containerClass="mb-3"
              apiPath="end-clients"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
