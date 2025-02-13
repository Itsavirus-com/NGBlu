'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import EndClientForm from '../../_components/EndClientForm'
import useEndClientForm from '../../_hooks/end-client-form.hook'

export default function UpdateEndClient({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients')

  const { methods, onSubmit, isLoading, isDisplayCompanyInfo, setIsDisplayCompanyInfo } =
    useEndClientForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateEndClient')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EndClientForm
          methods={methods}
          onSubmit={onSubmit}
          isDisplayCompanyInfo={isDisplayCompanyInfo}
          setIsDisplayCompanyInfo={setIsDisplayCompanyInfo}
        />
      )}
    </>
  )
}
