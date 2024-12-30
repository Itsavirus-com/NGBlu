'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'

interface EndClientInfoProps {
  data: any
  isLoading: boolean
}

export default function EndClientInfo({ data, isLoading }: EndClientInfoProps) {
  const t = useTranslations('dataManagement.endClients')

  const fields1 = [
    { label: t('name'), value: data?.name },
    { label: t('type'), value: data?.type?.type },
    { label: t('status'), value: data?.status?.status },
    { label: t('accountNumber'), value: data?.accountNumber },
    { label: t('referenceId'), value: data?.referenceId },
    { label: t('afasId'), value: data?.afasId },
  ]

  const fields2 = [
    { label: t('addressName'), value: data?.locationAddress?.addressName },
    { label: t('streetName'), value: data?.locationAddress?.streetname },
    { label: t('houseNumberSuffix'), value: data?.locationAddress?.housenumberSuffix },
    { label: t('houseNumber'), value: data?.locationAddress?.housenumber },
    { label: t('apartmentNumber'), value: data?.locationAddress?.appartmentNumber },
    { label: t('area'), value: data?.locationAddress?.area },
    { label: t('county'), value: data?.locationAddress?.county },
    { label: t('city'), value: data?.locationAddress?.city },
    { label: t('country'), value: data?.locationAddress?.country?.name },
    { label: t('postalCode'), value: data?.locationAddress?.postalcode },
  ]

  return (
    <>
      <Page title={t('endClientInfo')} className="pt-5">
        <Row>
          {fields1.map(({ label, value }, index) => (
            <TextView
              key={index}
              className="my-3"
              isLoading={isLoading}
              label={label}
              value={value}
            />
          ))}
        </Row>
        <Row>
          {fields2.map(({ label, value }, index) => (
            <TextView
              key={index}
              className="my-3"
              isLoading={isLoading}
              label={label}
              value={value}
            />
          ))}
        </Row>
      </Page>
    </>
  )
}
