'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Person } from '@/services/swr/models/person.type'

import useUserForm from '../_hooks/user-form.hook'

export default function NewUser() {
  const t = useTranslations('dataManagement.users')

  const { methods, onSubmit } = useUserForm()

  return (
    <>
      <PageTitle title={t('newUser')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('displayName')}
                name="displayName"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />
              <ControlledInput
                label={t('email')}
                name="email"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />
              <ControlledInput
                label={t('password')}
                name="password"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />
              <ControlledSelect<Person>
                label={t('person')}
                name="personId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="persons"
                option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
