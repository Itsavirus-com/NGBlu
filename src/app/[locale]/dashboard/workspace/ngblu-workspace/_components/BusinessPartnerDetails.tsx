'use client'

import { useTranslations } from 'next-intl'

import {
  EntityConfig,
  ManagementOption,
  WorkspaceActivities,
  WorkspaceEntity,
  WorkspaceInfo,
  WorkspaceLayout,
  WorkspaceTab,
} from '@/components/workspace'

type BusinessPartnerDetailsProps = {
  businessPartnerId: string
}

export const BusinessPartnerDetails = ({ businessPartnerId }: BusinessPartnerDetailsProps) => {
  const t = useTranslations('workspace.businessPartner')

  // Mock data - replace with actual API call
  const workspaceInfo: WorkspaceInfo = {
    id: 1,
    name: 'NGBLU',
    type: 'ngblu',
    companyUrl: 'www.company.com',
    phoneNumber: '+31 20 34 56 78',
    email: 'name@company.com',
    vatNumber: '351637912',
    addressName: 'Address name',
    postalCode: '1234 AB',
    cityName: 'City Name',
    countryName: 'Country Name',
    brancheName: 'Branche Name',
  }

  const managementOptions: ManagementOption[] = [
    {
      icon: 'people',
      titleKey: 'manageBusinessPartner',
      href: '/dashboard/workspace/ngblu-workspace/manage-business-partner',
    },
    { icon: 'chart-line', titleKey: 'manageProjects', href: '/dashboard/project/projects' },
    { icon: 'delivery-3', titleKey: 'manageProducts', href: '/dashboard/product/products' },
    { icon: 'credit-cart', titleKey: 'manageMarkupsDiscounts', href: '#' },
    { icon: 'setting', titleKey: 'manageSettings', href: '/dashboard/settings' },
    { icon: 'security-user', titleKey: 'manageAccounts', href: '/dashboard/users' },
    { icon: 'profile-user', titleKey: 'manageContacts', href: '/dashboard/person/persons' },
  ]

  // Mock business partners data
  const businessPartners: WorkspaceEntity[] = [
    {
      id: 1,
      name: 'Business Partner Name Example',
      generalInformation: 'General Information',
      phoneNumber: 'Phone Number',
      address: 'Address',
    },
    {
      id: 2,
      name: 'Business Partner Name Example',
      generalInformation: 'General Information',
      phoneNumber: 'Phone Number',
      address: 'Address',
    },
    {
      id: 3,
      name: 'Business Partner Name Example',
      generalInformation: 'General Information',
      phoneNumber: 'Phone Number',
      address: 'Address',
    },
    {
      id: 4,
      name: 'Business Partner Name Example',
      generalInformation: 'General Information',
      phoneNumber: 'Phone Number',
      address: 'Address',
    },
  ]

  const entityConfig: EntityConfig = {
    type: 'business-partner',
    icon: 'N',
    iconBg: 'bg-light-primary',
    iconColor: 'text-primary',
    singularKey: 'businessPartner',
    pluralKey: 'businessPartners',
    createButtonKey: 'createBusinessPartner',
    showMoreHref:
      '/dashboard/workspace/ngblu-workspace/manage-business-partner/business-partner-overview',
  }

  const tabs: WorkspaceTab[] = [
    {
      eventKey: 'overview',
      title: t('overview'),
      content: <WorkspaceActivities translationNamespace="workspace.businessPartner" />,
      condition: true,
    },
    {
      eventKey: 'invoices',
      title: t('invoices'),
      content: (
        <WorkspaceActivities translationNamespace="workspace.businessPartner" type="invoice" />
      ),
      condition: true,
    },
    {
      eventKey: 'installedBase',
      title: t('installedBase'),
      content: <div className="p-4">Installed Base content</div>,
      condition: true,
    },
    {
      eventKey: 'orders',
      title: t('orders'),
      content: (
        <WorkspaceActivities translationNamespace="workspace.businessPartner" type="order" />
      ),
      condition: true,
    },
  ]

  return (
    <WorkspaceLayout
      workspaceInfo={workspaceInfo}
      managementOptions={managementOptions}
      tabs={tabs}
      rightSidebarTitle={t('businessPartners')}
      rightSidebarCount={1015}
      rightSidebarCreateHref="/dashboard/workspace/ngblu-workspace/manage-business-partner/create-new-business-partner"
      rightSidebarCreateButtonText={t('createBusinessPartner')}
      entities={businessPartners}
      entityConfig={entityConfig}
      translationNamespace="workspace.businessPartner"
    />
  )
}
