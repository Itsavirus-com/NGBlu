import { useTranslations } from 'next-intl'

import { SidebarMenuItem } from './sidebar-menu-item'
import { SidebarMenuItemWithSub } from './sidebar-menu-item-with-sub'
import { SidebarMenuSeparator } from './sidebar-menu-separator'

const SidebarMenuMain = () => {
  const t = useTranslations('common.sidebar')

  return (
    <>
      <SidebarMenuItem to="/dashboard" icon="element-11" title={t('dashboard')} />

      <SidebarMenuSeparator title={t('dataValidation')} />
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
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/service"
        title={t('services')}
        icon="icon"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/service/services"
          title={t('services')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/service/types"
          title={t('servicesTypes')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/package"
        title={t('packages')}
        icon="cube-2"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/package/packages"
          title={t('packages')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/package/types"
          title={t('packagesTypes')}
          hasBullet
        />
      </SidebarMenuItemWithSub>

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

      <SidebarMenuItemWithSub
        to="/dashboard/data-management/person"
        title={t('person')}
        icon="profile-user"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/person/persons"
          title={t('persons')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/person/types"
          title={t('personTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/person/contact-types"
          title={t('contactTypes')}
          hasBullet
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="/dashboard/data-management/users"
        title={t('users')}
        icon="security-user"
      />
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/project"
        title={t('projects')}
        icon="chart-line"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/project/projects"
          title={t('projects')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/project/types"
          title={t('projectsTypes')}
          hasBullet
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/dashboard/data-management/end-clients"
        title={t('endClients')}
        icon="profile-user"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/end-client/end-clients"
          title={t('endClients')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/end-client/types"
          title={t('endClientTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/end-client/statuses"
          title={t('endClientStatuses')}
          hasBullet
        />
      </SidebarMenuItemWithSub>

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
        to="/dashboard/data-management/organization-units"
        title={t('organizationUnits')}
        icon="data"
      />
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/address"
        title={t('address')}
        icon="map"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/address/types"
          title={t('addressTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/address/addresses"
          title={t('addresses')}
          hasBullet
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="/dashboard/data-management/genders"
        title={t('genders')}
        icon="paintbucket"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/countries"
        title={t('countries')}
        icon="flag"
      />
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/payment"
        title={t('payment')}
        icon="credit-cart"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/payment/payments"
          title={t('payments')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/payment/types"
          title={t('paymentTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/payment/credit-card-types"
          title={t('creditCardTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/payment/credit-card-brands"
          title={t('creditCardBrands')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
    </>
  )
}

export { SidebarMenuMain }
