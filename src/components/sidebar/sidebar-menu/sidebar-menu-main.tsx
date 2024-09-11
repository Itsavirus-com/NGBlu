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
      <SidebarMenuItem
        to="/dashboard/data-management/packages"
        title={t('packages')}
        icon="cube-2"
      />

      <SidebarMenuItemWithSub
        to="/dashboard/data-management/prices"
        title={t('prices')}
        icon="credit-cart"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/prices/configs"
          title={t('priceConfigs')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/currencies"
          title={t('currencies')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/intervals"
          title={t('priceIntervals')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/plans"
          title={t('pricePlans')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/taxes"
          title={t('priceTaxes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/types"
          title={t('priceTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/prices/units"
          title={t('priceUnits')}
          hasBullet
        />
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
      <SidebarMenuItem
        to="/dashboard/data-management/projects"
        title={t('projects')}
        icon="chart-line"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/end-clients"
        title={t('endClients')}
        icon="profile-user"
      />
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/company"
        title={t('company')}
        icon="home-3"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/company/companies"
          title={t('companies')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/company/statuses"
          title={t('companyStatuses')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/dashboard/data-management/addresses"
        title={t('addresses')}
        icon="map"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/genders"
        title={t('genders')}
        icon="paintbucket"
      />
    </>
  )
}

export { SidebarMenuMain }
