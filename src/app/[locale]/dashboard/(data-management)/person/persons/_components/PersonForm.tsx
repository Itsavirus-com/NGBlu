'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Gender } from '@/services/swr/models/gender.type'
import { PersonType } from '@/services/swr/models/person-type.type'

interface PersonFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function PersonForm({ methods, onSubmit }: PersonFormProps) {
  const t = useTranslations('dataManagement.persons')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ControlledInput
                  label={t('namePrefix')}
                  name="namePrefix"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('firstName')}
                  name="firstname"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />

                <ControlledSelect<PersonType>
                  label={t('personType')}
                  name="personTypeId"
                  containerClass="mb-3"
                  apiPath="persons/types"
                  option={{ label: row => row.type, value: row => row.id }}
                  isRequired
                />

                <ControlledInput
                  label={t('department')}
                  name="department"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('salutation')}
                  name="salutation"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
              </Col>
              <Col>
                <ControlledInput
                  label={t('nameSuffix')}
                  name="nameSuffix"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('lastName')}
                  name="lastname"
                  containerClass="mb-3"
                  className="form-control-solid"
                />

                <ControlledSelect<Gender>
                  label={t('gender')}
                  name="genderId"
                  containerClass="mb-3"
                  apiPath="genders"
                  option={{ label: row => row.gender, value: row => row.id }}
                />
                <ControlledInput
                  label={t('pronounce')}
                  name="pronounce"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('titles')}
                  name="titles"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
              </Col>
            </Row>

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
