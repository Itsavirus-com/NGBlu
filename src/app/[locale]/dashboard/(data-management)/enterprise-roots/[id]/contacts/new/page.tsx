'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Contact } from '@/services/swr/models/contact.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { PersonResponsibility } from '@/services/swr/models/person-responsibility.type'
import { Person } from '@/services/swr/models/person.type'

import useEnterpriseRootContactForm from '../_hooks/enterprise-root-contact-form.hook'

export default function NewEnterpriseRootContact({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const { methods, onSubmit } = useEnterpriseRootContactForm()

  return (
    <>
      <PageTitle title={t('newContact')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Person>
                label={t('person')}
                name="personId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'persons'}
                option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<Contact>
                label={t('contactInfo')}
                name="contactInfoId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'contacts/infos'}
                option={{ label: row => row.contactInfo, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<PersonResponsibility>
                label={t('responsibility')}
                name="responsibilityId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'persons/responsibilities'}
                option={{ label: row => row.responsibility, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<OrganizationUnit>
                label={t('organisationUnit')}
                name="ouUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'organisational-units'}
                option={{ label: row => row.name, value: row => row.id }}
                filter={{ enterpriseRootId: params.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
