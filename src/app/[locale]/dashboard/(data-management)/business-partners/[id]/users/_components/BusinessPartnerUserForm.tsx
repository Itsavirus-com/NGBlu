'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { User } from '@/services/swr/models/user.type'

interface BusinessPartnerUserFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function BusinessPartnerUserForm({
  methods,
  onSubmit,
}: BusinessPartnerUserFormProps) {
  const t = useTranslations('dataManagement.businessPartners.users')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<User>
              label={t('user')}
              name="userId"
              containerClass="mb-3"
              apiPath="users"
              option={{ label: row => row.displayName, value: row => row.id }}
              isRequired
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
