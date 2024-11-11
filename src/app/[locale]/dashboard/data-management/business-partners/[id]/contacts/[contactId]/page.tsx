'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useBusinessPartnerContact } from '@/services/swr/use-business-partner-contact'

export default function BusinessPartnerContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.contacts')

  const { data, isLoading } = useBusinessPartnerContact(params.id, params.contactId)

  return (
    <>
      <PageTitle title={t('title')} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('salutation')}
            value={data?.person.salutation}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('firstName')}
            value={data?.person.firstname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('lastName')}
            value={data?.person.lastname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('nameSuffix')}
            value={data?.person.nameSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('nameSuffix')}
            value={data?.person.nameSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('pronounce')}
            value={data?.person.pronounce}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('gender')}
            value={data?.person.gender?.gender}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('personType')}
            value={data?.person.personType?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('titles')}
            value={data?.person.titles}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('department')}
            value={data?.person.department}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('role')}
            value={data?.person.role}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('enterpriseRoot')}
            value={data?.enterpriseRootId}
          />
        </Row>
      </Page>
    </>
  )
}
