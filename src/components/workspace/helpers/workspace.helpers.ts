import { EntityConfig, EntityType, ManagementOption, WorkspaceType } from '../types/workspace.types'

export const getDefaultEntityConfig = (
  entityType: EntityType,
  workspaceType?: WorkspaceType
): EntityConfig => {
  const configs: Record<EntityType, EntityConfig> = {
    'business-partner': {
      type: 'business-partner',
      icon: 'B',
      iconBg: 'bg-light-primary',
      iconColor: 'text-primary',
      singularKey: 'businessPartner',
      pluralKey: 'businessPartners',
      createButtonKey: 'createBusinessPartner',
      showMoreHref: `/dashboard/workspace/${workspaceType || 'ngblu'}-workspace/manage-business-partner/business-partner-overview`,
    },
  }

  return configs[entityType]
}

export const getDefaultManagementOptions = (workspaceType: WorkspaceType): ManagementOption[] => {
  const baseOptions: ManagementOption[] = [
    { icon: 'chart-line', titleKey: 'manageProjects', href: '/dashboard/project/projects' },
    { icon: 'delivery-3', titleKey: 'manageProducts', href: '/dashboard/product/products' },
    { icon: 'credit-cart', titleKey: 'manageMarkupsDiscounts', href: '#' },
    { icon: 'setting', titleKey: 'manageSettings', href: '/dashboard/settings' },
    { icon: 'security-user', titleKey: 'manageAccounts', href: '/dashboard/users' },
    { icon: 'profile-user', titleKey: 'manageContacts', href: '/dashboard/person/persons' },
  ]

  const specificOptions: Record<WorkspaceType, ManagementOption[]> = {
    ngblu: [
      {
        icon: 'people',
        titleKey: 'manageBusinessPartner',
        href: '/dashboard/workspace/ngblu-workspace/manage-business-partner',
      },
      ...baseOptions,
    ],
  }

  return specificOptions[workspaceType] || baseOptions
}
