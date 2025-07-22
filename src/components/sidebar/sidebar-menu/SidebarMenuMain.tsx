'use client'
import { useTranslations } from 'next-intl'

import { useIsSuperAdmin } from '@/hooks/use-auth'

import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuSeparator } from './SidebarMenuSeparator'

const SidebarMenuMain = () => {
  const t = useTranslations('common.sidebar')
  const { isSuperAdmin } = useIsSuperAdmin()

  return (
    <>
      {/* Dashboard */}
      <SidebarMenuItem to="/dashboard" icon="element-11" title={t('dashboard')} />

      {/* Onboarding */}
      <SidebarMenuSeparator title={t('onboarding')} />
      <SidebarMenuItemWithSub to="/dashboard/onboarding" title={t('onboarding')} icon="user-tick">
        <SidebarMenuItem
          to="/dashboard/onboarding/manage-business-partner"
          title={t('manageBusinessPartner')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/onboarding/profile-completion"
          title={t('profileCompletion')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      {/* End of Onboarding */}

      {/* Data Validation */}
      <SidebarMenuSeparator title={t('dataValidation')} />
      <SidebarMenuItem to="/dashboard/kvk" title={t('kvk')} icon="shield" />
      <SidebarMenuItem to="/dashboard/google" title={t('google')} icon="google" />
      <SidebarMenuItem to="/dashboard/data-hierarchy" title={t('hierarchy')} icon="abstract-26" />
      {/* End of Data Validation */}

      {/* Data Management */}
      <SidebarMenuSeparator title={t('dataManagement')} />
      <SidebarMenuItem to="/dashboard/enterprise-roots" title={t('enterpriseRoots')} icon="shop" />
      <SidebarMenuItem
        to="/dashboard/business-partners"
        title={t('businessPartners')}
        icon="briefcase"
      />
      <SidebarMenuItem to="/dashboard/companies" title={t('company')} icon="home-3" />
      <SidebarMenuItem to="/dashboard/end-clients" title={t('endClients')} icon="profile-user" />
      <SidebarMenuItem to="/dashboard/addresses" title={t('address')} icon="map" />
      <SidebarMenuItem
        to="/dashboard/organization-units"
        title={t('organizationUnits')}
        icon="data"
      />
      <SidebarMenuItem to="/dashboard/packages" title={t('packages')} icon="cube-2" />
      <SidebarMenuItem to="/dashboard/payments" title={t('payment')} icon="credit-cart" />
      <SidebarMenuItemWithSub to="/dashboard/person" title={t('person')} icon="profile-user">
        <SidebarMenuItem to="/dashboard/person/persons" title={t('persons')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/person/responsibilities"
          title={t('personResponsibilities')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to="/dashboard/price" title={t('prices')} icon="credit-cart">
        <SidebarMenuItem to="/dashboard/price/configs" title={t('priceConfigs')} hasBullet />
        <SidebarMenuItem to="/dashboard/price/plans" title={t('pricePlans')} hasBullet />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to="/dashboard/product" title={t('products')} icon="delivery-3">
        <SidebarMenuItem to="/dashboard/product/products" title={t('products')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/product/price-configs"
          title={t('productsPriceConfigs')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to="/dashboard/project" title={t('projects')} icon="chart-line">
        <SidebarMenuItem to="/dashboard/project/projects" title={t('projects')} hasBullet />
        <SidebarMenuItem to="/dashboard/project/infos" title={t('projectsInfos')} hasBullet />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to="/dashboard/service" title={t('services')} icon="icon">
        <SidebarMenuItem to="/dashboard/service/services" title={t('services')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/service/price-configs"
          title={t('servicesPriceConfigs')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      {isSuperAdmin && (
        <SidebarMenuItem to="/dashboard/users" title={t('users')} icon="security-user" />
      )}
      {isSuperAdmin && (
        <SidebarMenuItem to="/dashboard/audit-trails" title={t('auditTrails')} icon="tablet-ok" />
      )}
      {/* End of Data Management */}

      {/* Data Management - Settings */}
      <SidebarMenuItemWithSub to="/dashboard/settings" title={t('settings')} icon="setting">
        <SidebarMenuItem
          to="/dashboard/settings/address-types"
          title={t('addressTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/settings/business-partner-types"
          title={t('businessPartnersTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/settings/company-statuses"
          title={t('companyStatuses')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/settings/contact-types"
          title={t('contactTypes')}
          hasBullet
        />
        <SidebarMenuItem to="/dashboard/settings/countries" title={t('countries')} hasBullet />
        <SidebarMenuItem to="/dashboard/settings/currencies" title={t('currencies')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/settings/end-client-statuses"
          title={t('endClientStatuses')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/settings/end-client-types"
          title={t('endClientTypes')}
          hasBullet
        />
        <SidebarMenuItem to="/dashboard/settings/genders" title={t('genders')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/settings/package-types"
          title={t('packagesTypes')}
          hasBullet
        />
        <SidebarMenuItem to="/dashboard/settings/person-types" title={t('personTypes')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/settings/price-intervals"
          title={t('priceIntervals')}
          hasBullet
        />
        <SidebarMenuItem to="/dashboard/settings/price-taxes" title={t('priceTaxes')} hasBullet />
        <SidebarMenuItem to="/dashboard/settings/price-types" title={t('priceTypes')} hasBullet />
        <SidebarMenuItem to="/dashboard/settings/price-units" title={t('priceUnits')} hasBullet />
        <SidebarMenuItem
          to="/dashboard/settings/product-types"
          title={t('productsTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/settings/project-types"
          title={t('projectsTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/settings/service-types"
          title={t('servicesTypes')}
          hasBullet
        />
        <SidebarMenuItemWithSub to="/dashboard/settings/payment" title={t('payments')} hasBullet>
          <SidebarMenuItem
            to="/dashboard/settings/payment/credit-card-brands"
            title={t('creditCardBrands')}
            hasBullet
          />
          <SidebarMenuItem
            to="/dashboard/settings/payment/credit-card-types"
            title={t('creditCardTypes')}
            hasBullet
          />
          <SidebarMenuItem
            to="/dashboard/settings/payment/types"
            title={t('paymentTypes')}
            hasBullet
          />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      {/* End Data Management - Settings */}
    </>
  )
}

export { SidebarMenuMain }
