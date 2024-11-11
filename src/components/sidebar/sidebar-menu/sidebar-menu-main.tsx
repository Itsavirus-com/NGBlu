import { useTranslations } from 'next-intl'

import { SidebarMenuItem } from './sidebar-menu-item'
import { SidebarMenuItemWithSub } from './sidebar-menu-item-with-sub'
import { SidebarMenuSeparator } from './sidebar-menu-separator'

const SidebarMenuMain = () => {
  const t = useTranslations('common.sidebar')

  return (
    <>
      {/* Dashboard */}
      <SidebarMenuItem to="/dashboard" icon="element-11" title={t('dashboard')} />

      {/* Data Validation */}
      <SidebarMenuSeparator title={t('dataValidation')} />
      <SidebarMenuItem to="/dashboard/data-validation/kvk" title={t('kvk')} icon="shield" />
      <SidebarMenuItem to="/dashboard/data-validation/google" title={t('google')} icon="google" />
      <SidebarMenuItem
        to="/dashboard/data-validation/data-hierarchy"
        title={t('hierarchy')}
        icon="abstract-26"
      />
      {/* End of Data Validation */}

      {/* Data Management */}
      <SidebarMenuSeparator title={t('dataManagement')} />
      <SidebarMenuItem to="/dashboard/data-management/addresses" title={t('address')} icon="map" />
      <SidebarMenuItem
        to="/dashboard/data-management/business-partners"
        title={t('businessPartners')}
        icon="briefcase"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/companies"
        title={t('company')}
        icon="home-3"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/end-clients"
        title={t('endClients')}
        icon="profile-user"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/enterprise-roots"
        title={t('enterpriseRoots')}
        icon="shop"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/organization-units"
        title={t('organizationUnits')}
        icon="data"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/packages"
        title={t('packages')}
        icon="cube-2"
      />
      <SidebarMenuItem
        to="/dashboard/data-management/payments"
        title={t('payment')}
        icon="credit-cart"
      />
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
          to="/dashboard/data-management/person/responsibilities"
          title={t('personResponsibilities')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/price"
        title={t('prices')}
        icon="credit-cart"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/price/configs"
          title={t('priceConfigs')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/price/plans"
          title={t('pricePlans')}
          hasBullet
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/dashboard/data-management/product"
        title={t('products')}
        icon="delivery-3"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/product/products"
          title={t('products')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/product/price-configs"
          title={t('productsPriceConfigs')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
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
          to="/dashboard/data-management/project/infos"
          title={t('projectsInfos')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
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
          to="/dashboard/data-management/service/price-configs"
          title={t('servicesPriceConfigs')}
          hasBullet
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/dashboard/data-management/users"
        title={t('users')}
        icon="security-user"
      />
      {/* End of Data Management */}

      {/* Data Management - Settings */}
      <SidebarMenuItemWithSub
        to="/dashboard/data-management/settings"
        title={t('settings')}
        icon="setting"
      >
        <SidebarMenuItem
          to="/dashboard/data-management/settings/address-types"
          title={t('addressTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/business-partner-types"
          title={t('businessPartnersTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/company-statuses"
          title={t('companyStatuses')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/contact-types"
          title={t('contactTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/countries"
          title={t('countries')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/currencies"
          title={t('currencies')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/end-client-statuses"
          title={t('endClientStatuses')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/end-client-types"
          title={t('endClientTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/genders"
          title={t('genders')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/package-types"
          title={t('packagesTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/person-types"
          title={t('personTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/price-intervals"
          title={t('priceIntervals')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/price-taxes"
          title={t('priceTaxes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/price-types"
          title={t('priceTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/price-units"
          title={t('priceUnits')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/product-types"
          title={t('productsTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/project-types"
          title={t('projectsTypes')}
          hasBullet
        />
        <SidebarMenuItem
          to="/dashboard/data-management/settings/service-types"
          title={t('servicesTypes')}
          hasBullet
        />
        <SidebarMenuItemWithSub
          to="/dashboard/data-management/settings/payment"
          title={t('payments')}
          hasBullet
        >
          <SidebarMenuItem
            to="/dashboard/data-management/settings/payment/credit-card-brands"
            title={t('creditCardBrands')}
            hasBullet
          />
          <SidebarMenuItem
            to="/dashboard/data-management/settings/payment/credit-card-types"
            title={t('creditCardTypes')}
            hasBullet
          />
          <SidebarMenuItem
            to="/dashboard/data-management/settings/payment/types"
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
