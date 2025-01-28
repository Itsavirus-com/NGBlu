'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { Contact } from '@/services/swr/models/contact.type'
import { PersonResponsibility } from '@/services/swr/models/person-responsibility.type'
import { Person } from '@/services/swr/models/person.type'

import useEndClientContactForm from '../../../_hooks/end-client-contact-form.hook'

export default function UpdateEndClientContact({
  params,
}: {
  params: { id: string; contactId: string }
}) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { methods, onSubmit, isLoading } = useEndClientContactForm(
    Number(params.id),
    Number(params.contactId)
  )

  return (
    <>
      <PageTitle title={t('updateContact')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <ControlledSelect<Person>
                  label={t('person')}
                  name="personId"
                  containerClass="mb-3"
                  apiPath={'persons'}
                  option={{
                    label: row => `${row.firstname} ${row.lastname}`,
                    value: row => row.id,
                  }}
                  isRequired
                />
                <ControlledSelect<Contact>
                  label={t('contactInfo')}
                  name="contactInfoId"
                  containerClass="mb-3"
                  apiPath={'contacts/infos'}
                  option={{ label: row => row.contactInfo, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PersonResponsibility>
                  label={t('responsibility')}
                  name="responsibilityId"
                  containerClass="mb-3"
                  apiPath={'persons/responsibilities'}
                  option={{ label: row => row.responsibility, value: row => row.id }}
                  isRequired
                />

                <FormButtons />
              </CardBody>
            </Card>
          </div>
        </FormProvider>
      )}
    </>
  )
}
