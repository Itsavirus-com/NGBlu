'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Gender } from '@/services/swr/models/gender.type'
import { PersonType } from '@/services/swr/models/person-type.type'

import usePersonForm from '../../components/person-form.hook'

export default function UpdatePerson() {
  const { id } = useParams()
  const t = useTranslations('dataManagement.persons')

  const { methods, onSubmit } = usePersonForm(Number(id))

  return (
    <>
      <PageTitle title={t('updatePerson')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('firstName')}
                name="firstname"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('lastName')}
                name="lastname"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('pronounce')}
                name="pronounce"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('namePrefix')}
                name="namePrefix"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('nameSuffix')}
                name="nameSuffix"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<Gender>
                label={t('gender')}
                name="genderId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="genders"
                option={{ label: row => row.gender, value: row => row.id }}
              />
              <ControlledSelect<PersonType>
                label={t('personType')}
                name="personTypeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="persons/types"
                option={{ label: row => row.type, value: row => row.id }}
              />
              <ControlledInput
                label={t('titles')}
                name="titles"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('salutation')}
                name="salutation"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('department')}
                name="department"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('role')}
                name="role"
                containerClass="mb-3"
                className="form-control-solid"
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
