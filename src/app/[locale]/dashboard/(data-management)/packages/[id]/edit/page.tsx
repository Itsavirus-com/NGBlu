'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { PackageType } from '@/services/swr/models/package-type.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'

import usePackageForm from '../../_hooks/package-form.hook'

export default function UpdatePackage({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isLoading } = usePackageForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePackage')} />
      {isLoading ? (
        <Loading />
      ) : (
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
                <ControlledSelect<PackageType>
                  label={t('types.name')}
                  name="packageTypeId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="packages/types"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceConfig>
                  label={t('priceConfig')}
                  name="priceConfigId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="prices/configs"
                  option={{ label: row => row.priceType.type, value: row => row.id }}
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
