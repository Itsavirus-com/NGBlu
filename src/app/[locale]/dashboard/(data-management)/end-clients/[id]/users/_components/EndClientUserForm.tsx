'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { User } from '@/services/swr/models/user.type'

interface EndClientUserFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function EndClientUserForm({ methods, onSubmit }: EndClientUserFormProps) {
  const t = useTranslations('dataManagement.endClients.users')

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
