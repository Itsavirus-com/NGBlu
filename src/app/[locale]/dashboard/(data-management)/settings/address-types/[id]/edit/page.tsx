'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useAddressTypeForm from '../../components/address-type-form.hook'

export default function UpdateAddressType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addressTypes')

  const { methods, onSubmit } = useAddressTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateAddressType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('addressType')}
                name="addressType"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
