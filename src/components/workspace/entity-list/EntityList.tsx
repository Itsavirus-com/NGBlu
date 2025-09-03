'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { EntityConfig, EntityType, WorkspaceEntity } from '../types/workspace.types'

type EntityListProps = {
  entities: WorkspaceEntity[]
  entityConfig: EntityConfig
  maxDisplayCount?: number
  className?: string
  translationNamespace?: string
}

const getEntityConfig = (entityType: EntityType): EntityConfig => {
  const configs: Record<EntityType, EntityConfig> = {
    'business-partner': {
      type: 'business-partner',
      icon: 'N',
      iconBg: 'bg-light-primary',
      iconColor: 'text-primary',
      singularKey: 'businessPartner',
      pluralKey: 'businessPartners',
      createButtonKey: 'createBusinessPartner',
      showMoreHref: '/manage-business-partner/business-partner-overview',
    },
  }

  return configs[entityType]
}

export const EntityList = ({
  entities,
  entityConfig,
  maxDisplayCount = 4,
  className = '',
  translationNamespace,
}: EntityListProps) => {
  const t = useTranslations(translationNamespace)
  const config = entityConfig

  const displayEntities = entities.slice(0, maxDisplayCount)

  return (
    <div className={className}>
      {displayEntities.map(entity => (
        <div key={entity.id} className="mb-3">
          <div className="card border border-gray-300">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-30px me-3">
                  <div className={`symbol-label ${config.iconBg}`}>
                    <span className={`${config.iconColor} fw-bold fs-7`}>{config.icon}</span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-bold text-primary fs-7">{entity.name}</h6>
                  {entity.generalInformation && (
                    <p className="mb-1 text-gray-600 fs-8">{entity.generalInformation}</p>
                  )}
                  {entity.phoneNumber && (
                    <p className="mb-1 text-gray-600 fs-8">{entity.phoneNumber}</p>
                  )}
                  {entity.address && <p className="mb-0 text-gray-600 fs-8">{entity.address}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Show More Button */}
      <div className="text-center mt-3">
        <Link href={config.showMoreHref} className="btn btn-sm btn-outline btn-light fw-bold">
          {t('showMore')}
        </Link>
      </div>
    </div>
  )
}
