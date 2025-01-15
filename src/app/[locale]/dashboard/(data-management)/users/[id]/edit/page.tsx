'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Person } from '@/services/swr/models/person.type'

import useUserForm from '../../_hooks/user-form.hook'

export default function UpdateUser({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.users')

  const { methods, onSubmit, blockUser } = useUserForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateUser')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('displayName')}
                name="displayName"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('email')}
                name="email"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('password')}
                name="password"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<Person>
                label={t('person')}
                name="personId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="persons"
                option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              />
              <ControlledSwitch
                label={t('blocked')}
                name="blocked"
                containerClass="mb-3"
                className="form-control-solid"
                onChange={e => blockUser(e.target.checked)}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
