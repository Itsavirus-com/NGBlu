'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import UserForm from '../../_components/UserForm'
import useUserForm from '../../_hooks/user-form.hook'

export default function UpdateUser({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.users')
  const { methods, onSubmit, blockUser, isSubmitting } = useUserForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateUser')} />
      <UserForm
        methods={methods}
        onSubmit={onSubmit}
        blockUser={blockUser}
        isEdit
        isSubmitting={isSubmitting}
      />
    </>
  )
}
