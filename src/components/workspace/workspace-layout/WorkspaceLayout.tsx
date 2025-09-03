'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'

import { EntityList } from '../entity-list/EntityList'
import { QuotesList } from '../quotes-list/QuotesList'
import {
  EntityConfig,
  ManagementOption,
  WorkspaceEntity,
  WorkspaceInfo,
  WorkspaceQuote,
  WorkspaceTab,
} from '../types/workspace.types'

type WorkspaceLayoutProps = {
  workspaceInfo: WorkspaceInfo
  managementOptions: ManagementOption[]
  tabs: WorkspaceTab[]
  // Right sidebar props
  rightSidebarTitle: string
  rightSidebarCount?: number
  rightSidebarCreateHref?: string
  rightSidebarCreateButtonText?: string
  // Entities (business partners, customers, services, etc.)
  entities?: WorkspaceEntity[]
  entityConfig?: EntityConfig
  // Quotes
  quotes?: WorkspaceQuote[]
  showQuotes?: boolean
  // Layout props
  className?: string
  translationNamespace?: string
}

export const WorkspaceLayout = ({
  workspaceInfo,
  managementOptions,
  tabs,
  rightSidebarTitle,
  rightSidebarCount,
  rightSidebarCreateHref,
  rightSidebarCreateButtonText,
  entities = [],
  entityConfig,
  quotes = [],
  showQuotes = true,
  className = '',
  translationNamespace,
}: WorkspaceLayoutProps) => {
  const t = useTranslations(translationNamespace)
  const [searchTerm, setSearchTerm] = useState('')

  const getWorkspaceTypeLabel = () => {
    switch (workspaceInfo.type) {
      case 'ngblu':
        return t('ngbluWorkspace')
      default:
        return t('workspace')
    }
  }

  const getWorkspaceIcon = () => {
    switch (workspaceInfo.type) {
      case 'ngblu':
        return 'N'
      default:
        return 'W'
    }
  }

  const getInfoSectionTitle = () => {
    switch (workspaceInfo.type) {
      case 'ngblu':
        return t('ngbluInformation')
      default:
        return t('workspaceInformation')
    }
  }

  const getWorkspaceTheme = () => {
    switch (workspaceInfo.type) {
      case 'ngblu':
        return 'bg-light-primary'
      default:
        return 'bg-light-dark'
    }
  }

  return (
    <div className={`app-container container-fluid ${className} ${getWorkspaceTheme()} py-10`}>
      <Row className="g-0">
        {/* Left Sidebar */}
        <Col lg={3} className="pe-lg-3">
          {/* Workspace Header */}
          <div className="d-flex align-items-center mb-4">
            <div className="symbol symbol-40px me-3">
              <div className="symbol-label bg-primary">
                <span className="text-white fw-bold">{getWorkspaceIcon()}</span>
              </div>
            </div>
            <div>
              <h5 className="mb-0 fw-bold">{getWorkspaceTypeLabel()}</h5>
              {workspaceInfo.companyUrl && (
                <div className="d-flex align-items-center text-muted">
                  <i className="ki-outline ki-global fs-6 me-1"></i>
                  <span className="fs-7">{workspaceInfo.companyUrl}</span>
                </div>
              )}
              {workspaceInfo.phoneNumber && (
                <div className="d-flex align-items-center text-muted">
                  <i className="ki-outline ki-phone fs-6 me-1"></i>
                  <span className="fs-7">{workspaceInfo.phoneNumber}</span>
                </div>
              )}
              {workspaceInfo.email && (
                <div className="d-flex align-items-center text-muted">
                  <i className="ki-outline ki-sms fs-6 me-1"></i>
                  <span className="fs-7">{workspaceInfo.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Workspace Information */}
          <div className="card mb-4 pb-5">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-4 mb-1">{getInfoSectionTitle()}</span>
              </h3>
              <div className="card-toolbar">
                <i className="ki-outline ki-setting-2 fs-4 text-muted"></i>
              </div>
            </div>
            <div className="card-body py-3">
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('id')}</label>
                <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.id}</p>
              </div>
              {workspaceInfo.vatNumber && (
                <div className="mb-3">
                  <label className="form-label fw-bold text-gray-600 fs-7">{t('vatNumber')}</label>
                  <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.vatNumber}</p>
                </div>
              )}
              {workspaceInfo.addressName && (
                <div className="mb-3">
                  <label className="form-label fw-bold text-gray-600 fs-7">{t('address')}</label>
                  <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.addressName}</p>
                </div>
              )}
              {workspaceInfo.postalCode && (
                <div className="mb-3">
                  <label className="form-label fw-bold text-gray-600 fs-7">{t('postalCode')}</label>
                  <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.postalCode}</p>
                </div>
              )}
              {workspaceInfo.cityName && (
                <div className="mb-3">
                  <label className="form-label fw-bold text-gray-600 fs-7">{t('city')}</label>
                  <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.cityName}</p>
                </div>
              )}
              {workspaceInfo.countryName && (
                <div className="mb-3">
                  <label className="form-label fw-bold text-gray-600 fs-7">{t('country')}</label>
                  <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.countryName}</p>
                </div>
              )}
              {workspaceInfo.brancheName && (
                <div className="mb-0">
                  <label className="form-label fw-bold text-gray-600 fs-7">{t('branche')}</label>
                  <p className="text-gray-800 fs-7 mb-0">{workspaceInfo.brancheName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Management Options */}
          <div className="card">
            <div className="card-body py-3">
              <div className="menu menu-column menu-rounded menu-sub-indention">
                {managementOptions.map((option, index) => (
                  <div key={index} className="menu-item">
                    <Link href={option.href} className="menu-link py-3 px-0">
                      <span className="menu-icon">
                        <i className={`ki-outline ki-${option.icon} fs-4`}></i>
                      </span>
                      <span className="menu-title fw-semibold">{t(option.titleKey)}</span>
                      <span>
                        <i className="ki-outline ki-setting-2 fs-6"></i>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col lg={6} className="pe-lg-3">
          {/* <Card className="card-stretch" bg='none'> */}
          {/* Search Bar */}
          <div className="d-flex align-items-center my-4 mx-8">
            <div className="position-relative flex-grow-1">
              <i className="ki-outline ki-magnifier fs-3 position-absolute ms-3 mt-3"></i>
              <input
                type="text"
                className="form-control ps-10"
                placeholder={t('searchActivities')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Dynamic Tabs */}
          <DynamicTabs tabs={tabs} defaultActiveKey="overview" />
          {/* </Card> */}
        </Col>

        {/* Right Sidebar */}
        <Col lg={3}>
          {/* Right Sidebar Header */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="fw-bold mb-0">
              {rightSidebarTitle} {rightSidebarCount && `(${rightSidebarCount})`}
            </h6>
            {rightSidebarCreateHref && rightSidebarCreateButtonText && (
              <Link href={rightSidebarCreateHref} className="btn btn-sm btn-primary">
                {rightSidebarCreateButtonText}
              </Link>
            )}
          </div>

          {/* Entities List */}
          {entities.length > 0 && entityConfig && (
            <EntityList
              entities={entities}
              entityConfig={entityConfig}
              translationNamespace="workspace.businessPartner"
            />
          )}

          {/* Quotes Section */}
          {showQuotes && (
            <div className="mt-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">{t('quotes')}</h6>
                <button className="btn btn-sm btn-primary">{t('createQuote')}</button>
              </div>
              <QuotesList quotes={quotes} translationNamespace={translationNamespace} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}
