'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { ContactType } from '@/services/swr/models/contact-type.type'

import usePersonContactForm from '../../../components/contact-form.hook'

export default function UpdatePersonContact({ params }: { params: { contactId: number } }) {
  const t = useTranslations('dataManagement.persons.contacts')

  const { methods, onSubmit } = usePersonContactForm(Number(params.contactId))

  return (
    <>
      <PageTitle title={t('updatePersonContact')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('contact')}
                name="contactInfo"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<ContactType>
                label={t('contactType')}
                name="contactTypeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="contacts/types"
                option={{ label: row => row.contactType, value: row => row.id }}
              />
              <ControlledSelect
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('businesspartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('endclient')}
                name="endclientId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="end-clients"
                option={{ label: row => row.name, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
