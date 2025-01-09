'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useGenderForm from '../../components/gender-form.hook'

export default function UpdateGender({ params }: { params: { genderId: number } }) {
  const t = useTranslations('dataManagement.genders')

  const { methods, onSubmit } = useGenderForm(Number(params.genderId))

  return (
    <>
      <PageTitle title={t('updateGender')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('gender')}
                name="gender"
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
