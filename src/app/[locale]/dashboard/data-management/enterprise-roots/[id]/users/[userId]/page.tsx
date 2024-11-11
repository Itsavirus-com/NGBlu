'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEnterpriseRootUser } from '@/services/swr/use-enterprise-root-user'

export default function EnterpriseRootUserDetails({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const { data, isLoading } = useEnterpriseRootUser(params.id, params.userId)

  return (
    <>
      <PageTitle title={t('title')} />

      <Page title={t('enterpriseRootUser')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('displayName')}
            value={data?.user.displayName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('email')}
            value={data?.user.email}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('lastLogin')}
            value={data?.user.lastLogin || '-'}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('blocked')}
            value={data?.user.blockedAt ? t('yes') : t('no')}
          />
        </Row>
      </Page>

      <Page title={t('enterpriseRootPerson')} className="mt-4">
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
        </Row>
      </Page>
    </>
  )
}
