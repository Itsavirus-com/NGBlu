'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Person } from '@/services/swr/models/person.type'

interface UserFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  blockUser?: (checked: boolean) => void
  isEdit?: boolean
}

export default function UserForm({ methods, onSubmit, blockUser, isEdit }: UserFormProps) {
  const t = useTranslations('dataManagement.users')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('displayName')}
              name="displayName"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired={!isEdit}
            />
            <ControlledInput
              label={t('email')}
              name="email"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired={!isEdit}
            />
            <ControlledInput
              label={t('password')}
              name="password"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired={!isEdit}
            />
            <ControlledSelect<Person>
              label={t('person')}
              name="personId"
              containerClass="mb-3"
              apiPath="persons"
              option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
            />
            {isEdit && blockUser && (
              <ControlledSwitch
                label={t('blocked')}
                name="blocked"
                containerClass="mb-3"
                className="form-control-solid"
                onChange={e => blockUser(e.target.checked)}
              />
            )}

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
