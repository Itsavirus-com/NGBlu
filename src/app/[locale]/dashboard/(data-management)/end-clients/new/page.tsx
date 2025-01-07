'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { Company } from '@/services/swr/models/company.type'
import { EndClientStatus } from '@/services/swr/models/end-client-status.type'
import { EndClientType } from '@/services/swr/models/end-client-type.type'
import { Person } from '@/services/swr/models/person.type'

import useEndClientForm from '../hooks/end-client-form.hook'

export default function NewEndClient() {
  const t = useTranslations('dataManagement.endClients')

  const { methods, onSubmit } = useEndClientForm()

  return (
    <>
      <PageTitle title={t('newEndClient')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('name')}
                name="name"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />
              <ControlledInput
                label={t('accountNumber')}
                name="accountNumber"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('afasId')}
                name="afasId"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<EndClientType>
                label={t('type')}
                name="typeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="end-clients/types"
                option={{ label: row => row.type, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<EndClientStatus>
                label={t('status')}
                name="statusId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="end-clients/statuses"
                option={{ label: row => row.status, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<Address>
                label={t('locationAddress')}
                name="locationAddressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
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
              <ControlledSelect<Person>
                label={t('contactPerson')}
                name="contactPersonId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="persons"
                option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              />

              <ControlledSelect<Company>
                label={t('company')}
                name="companyInfoId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="companies/infos"
                option={{ label: row => row.companyname, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
