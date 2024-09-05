'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { usePerson } from '@/services/swr/use-person'

export default function PersonDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.persons')

  const { data, isLoading } = usePerson(params.id)

  return (
    <>
      <PageTitle title={`${data?.firstname || ''} ${data?.lastname || ''}`} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('salutation')}
            value={data?.salutation}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('firstName')}
            value={data?.firstname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('lastName')}
            value={data?.lastname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('nameSuffix')}
            value={data?.nameSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('nameSuffix')}
            value={data?.nameSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('pronounce')}
            value={data?.pronounce}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('gender')}
            value={data?.gender?.gender}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('personType')}
            value={data?.personType?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('titles')}
            value={data?.titles}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('department')}
            value={data?.department}
          />
          <TextView className="my-3" isLoading={isLoading} label={t('role')} value={data?.role} />
        </Row>
      </Page>
    </>
  )
}
