'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { ContactType } from '@/services/swr/models/contact-type.type'

import useContactTypeForm from '../../components/contact-type-form.hook'

export default function UpdateContactType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.contactTypes')

  const { methods, onSubmit } = useContactTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateContactType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('type')}
                name="contactType"
                containerClass="mb-3"
                className="form-control-solid"
              />

              <ControlledSelect<ContactType>
                label={t('parent')}
                name="parentId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="contacts/types"
                option={{ label: row => row.contactType, value: row => row.id }}
              />
              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
