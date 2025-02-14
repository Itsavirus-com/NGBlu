import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Contact } from '@/services/swr/models/contact.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { PersonResponsibility } from '@/services/swr/models/person-responsibility.type'
import { Person } from '@/services/swr/models/person.type'

interface EnterpriseRootContactFormFieldsProps {
  methods: UseFormReturn<any>
  enterpriseRootId: string
  onSubmit: (data: any) => void
}

export function EnterpriseRootContactFormFields({
  methods,
  enterpriseRootId,
  onSubmit,
}: EnterpriseRootContactFormFieldsProps) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Person>
              label={t('person')}
              name="personId"
              containerClass="mb-3"
              apiPath={'persons'}
              option={{ label: row => `${row.firstname} ${row.lastname}`, value: row => row.id }}
              onChange={() => {
                methods.setValue('contactInfoId', 0)
              }}
              isRequired
            />
            <ControlledSelect<Contact>
              label={t('contactInfo')}
              name="contactInfoId"
              containerClass="mb-3"
              apiPath={'contacts/infos'}
              option={{ label: row => row.contactInfo, value: row => row.id }}
              filter={{ personId: Number(methods.watch('personId')) }}
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
            <ControlledSelect<OrganizationUnit>
              label={t('organisationUnit')}
              name="ouUnitId"
              containerClass="mb-3"
              apiPath={'organisational-units'}
              option={{ label: row => row.name, value: row => row.id }}
              filter={{ enterpriseRootId }}
            />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
