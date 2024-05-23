import { useTranslations } from 'next-intl'

import { SidebarMenuItem } from './sidebar-menu-item'
import { SidebarMenuSeparator } from './sidebar-menu-separator'

const SidebarMenuMain = () => {
  const t = useTranslations('common.sidebar')

  return (
    <>
      <SidebarMenuItem to="/dashboard" icon="element-11" title={t('dashboard')} />

      <SidebarMenuSeparator title={t('data_validation')} />
      <SidebarMenuItem to="/dashboard/data-validation/kvk" title={t('kvk')} icon="shield" />
      <SidebarMenuItem to="/dashboard/data-validation/google" title={t('Google')} icon="google" />
      <SidebarMenuItem
        to="/dashboard/data-validation/validation"
        title={t('validation')}
        icon="abstract-26"
      />
    </>
  )
}

export { SidebarMenuMain }
