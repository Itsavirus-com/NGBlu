'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Person } from '@/services/swr/models/person.type'
import { User } from '@/services/swr/models/user.type'

interface EnterpriseRootUserFormProps {
  enterpriseRootId: number
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export function EnterpriseRootUserForm({
  enterpriseRootId,
  methods,
  onSubmit,
}: EnterpriseRootUserFormProps) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<User>
              label={t('user')}
              name="userId"
              containerClass="mb-3"
              apiPath={'users'}
              option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<Person>
              label={t('person')}
              name="personId"
              containerClass="mb-3"
              apiPath="persons"
              option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<OrganizationUnit>
              label={t('organisationalUnit')}
              name="ouUnitId"
              containerClass="mb-3"
              apiPath={'organisational-units'}
              option={{ label: row => row.name, value: row => row.id }}
              filter={{ enterpriseRootId }}
            />
            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
