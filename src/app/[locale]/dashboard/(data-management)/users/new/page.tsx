'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import UserForm from '../_components/UserForm'
import useUserForm from '../_hooks/user-form.hook'

export default function NewUser() {
  const t = useTranslations('dataManagement.users')
  const { methods, onSubmit, isSubmitting, errorMessageInputType } = useUserForm()

  return (
    <>
      <PageTitle title={t('newUser')} />
      <UserForm
        methods={methods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errorMessageInputType={errorMessageInputType}
      />
    </>
  )
}
