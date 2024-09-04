import { useTranslations } from 'next-intl'

import { SidebarMenuItem } from './sidebar-menu-item'
import { SidebarMenuItemWithSub } from './sidebar-menu-item-with-sub'
import { SidebarMenuSeparator } from './sidebar-menu-separator'

const SidebarMenuMain = () => {
  const t = useTranslations('common.sidebar')

  return (
    <>
      <SidebarMenuItem to="/dashboard" icon="element-11" title={t('dashboard')} />

      <SidebarMenuSeparator title={t('data_validation')} />
      <SidebarMenuItem to="/dashboard/data-validation/kvk" title={t('kvk')} icon="shield" />
      <SidebarMenuItem to="/dashboard/data-validation/google" title={t('google')} icon="google" />
      <SidebarMenuItem
        to="/dashboard/data-validation/data-hierarchy"
        title={t('hierarchy')}
        icon="abstract-26"
      />

      <SidebarMenuSeparator title={t('dataManagement')} />
      <SidebarMenuItem
        to="/dashboard/data-management/products"
        title={t('products')}
        icon="delivery-3"
      />
      <SidebarMenuItem to="/dashboard/data-management/services" title={t('services')} icon="icon" />

      <SidebarMenuItemWithSub title={t('prices')} icon="credit-cart">
        <SidebarMenuItem to="/dashboard/data-management/prices/configs" title={t('priceConfigs')} />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/currencies"
          title={t('currencies')}
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/intervals"
          title={t('priceIntervals')}
        />
        <SidebarMenuItem to="/dashboard/data-management/prices/plans" title={t('pricePlans')} />
        <SidebarMenuItem to="/dashboard/data-management/prices/taxes" title={t('priceTaxes')} />
        <SidebarMenuItem to="/dashboard/data-management/prices/types" title={t('priceTypes')} />
        <SidebarMenuItem to="/dashboard/data-management/prices/units" title={t('priceUnits')} />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="/dashboard/data-management/persons"
        title={t('persons')}
        icon="profile-user"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/users"
        title={t('users')}
        icon="security-user"
      />
    </>
  )
}

export { SidebarMenuMain }
