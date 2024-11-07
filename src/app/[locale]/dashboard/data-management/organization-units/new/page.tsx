'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'

import useOrganizationUnitForm from '../components/organization-unit-form.hook'

export default function NewOrganizationUnit() {
  const t = useTranslations('dataManagement.organizationUnits')

  const { methods, onSubmit } = useOrganizationUnitForm()

  const [inputType, setInputType] = useState<
    'endclientId' | 'businesspartnerId' | 'enterpriseRootId' | null
  >(null)

  const handleChange = (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => {
    setInputType(value)
    methods.resetField('endclientId', { defaultValue: 0 })
    methods.resetField('businesspartnerId', { defaultValue: 0 })
    methods.resetField('enterpriseRootId', { defaultValue: 0 })
  }

  return (
    <>
      <PageTitle title={t('newOrganizationUnit')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('name')}
                name="name"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <div className="d-flex gap-3">
                <ControlledSwitch
                  type="radio"
                  label={t('endClient')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'endclientId'}
                  onChange={() => handleChange('endclientId')}
                />
                <ControlledSwitch
                  type="radio"
                  label={t('businessPartner')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'businesspartnerId'}
                  onChange={() => handleChange('businesspartnerId')}
                />
                <ControlledSwitch
                  type="radio"
                  label={t('enterpriseRoot')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'enterpriseRootId'}
                  onChange={() => handleChange('enterpriseRootId')}
                />
              </div>
              <ControlledSelect
                label={t('endClient')}
                name="endclientId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="end-clients"
                option={{ label: row => row.name, value: row => row.id }}
                disabled={inputType !== 'endclientId'}
              />
              <ControlledSelect
                label={t('businessPartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
                disabled={inputType !== 'businesspartnerId'}
              />
              <ControlledSelect
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
                disabled={inputType !== 'enterpriseRootId'}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
