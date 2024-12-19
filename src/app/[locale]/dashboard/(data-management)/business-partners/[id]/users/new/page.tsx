'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Person } from '@/services/swr/models/person.type'
import { User } from '@/services/swr/models/user.type'

import useBusinessPartnerUserForm from '../../components/business-partner-user-form.hook'

export default function NewBusinessPartnerUser({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { methods, onSubmit } = useBusinessPartnerUserForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newUser')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<User>
                label={t('user')}
                name="userId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'users'}
                option={{ label: row => row.displayName, value: row => row.id }}
              />
              <ControlledSelect<Person>
                label={t('person')}
                name="personId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="persons"
                option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              />
              <ControlledSelect<OrganizationUnit>
                label={t('organisationalUnit')}
                name="ouUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'organisational-units'}
                option={{ label: row => row.name, value: row => row.id }}
                filter={{
                  businesspartnerId: params.id,
                }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
