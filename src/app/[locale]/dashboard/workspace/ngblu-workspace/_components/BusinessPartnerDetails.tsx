'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'

import { BusinessPartnerActivities } from './BusinessPartnerActivities'
import { BusinessPartnerQuotes } from './BusinessPartnerQuotes'
import { BusinessPartnerSites } from './BusinessPartnerSites'
import { BusinessPartnerInfo } from '../_types/business-partner.types'

type BusinessPartnerDetailsProps = {
  businessPartnerId: string
}

export const BusinessPartnerDetails = ({ businessPartnerId }: BusinessPartnerDetailsProps) => {
  const t = useTranslations('workspace.businessPartner')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with actual API call
  const businessPartnerData: BusinessPartnerInfo = {
    id: 1,
    name: 'NGBLU',
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

  const managementOptions = [
    { icon: 'chart-line', titleKey: 'manageProjects', href: '/dashboard/project/projects' },
    { icon: 'delivery-3', titleKey: 'manageProducts', href: '/dashboard/product/products' },
    { icon: 'credit-cart', titleKey: 'manageMarkupsDiscounts', href: '#' },
    { icon: 'setting', titleKey: 'manageSettings', href: '/dashboard/settings' },
    { icon: 'security-user', titleKey: 'manageAccounts', href: '/dashboard/users' },
    { icon: 'profile-user', titleKey: 'manageContacts', href: '/dashboard/person/persons' },
  ]

  const tabs = [
    {
      eventKey: 'overview',
      title: t('overview'),
      content: <BusinessPartnerActivities businessPartnerId={businessPartnerId} />,
      condition: true,
    },
    {
      eventKey: 'invoices',
      title: t('invoices'),
      content: <BusinessPartnerActivities businessPartnerId={businessPartnerId} type="invoice" />,
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
      content: <BusinessPartnerActivities businessPartnerId={businessPartnerId} type="order" />,
      condition: true,
    },
  ]

  return (
    <div className="app-container container-fluid">
      <Row className="g-0">
        {/* Left Sidebar */}
        <Col lg={3} className="pe-lg-3">
          {/* NGBLU Workspace Header */}
          <div className="d-flex align-items-center mb-4">
            <div className="symbol symbol-40px me-3">
              <div className="symbol-label bg-primary">
                <span className="text-white fw-bold">N</span>
              </div>
            </div>
            <div>
              <h5 className="mb-0 fw-bold">{t('ngbluWorkspace')}</h5>
              <div className="d-flex align-items-center text-muted">
                <i className="ki-outline ki-global fs-6 me-1"></i>
                <span className="fs-7">{businessPartnerData.companyUrl}</span>
              </div>
              <div className="d-flex align-items-center text-muted">
                <i className="ki-outline ki-phone fs-6 me-1"></i>
                <span className="fs-7">{businessPartnerData.phoneNumber}</span>
              </div>
              <div className="d-flex align-items-center text-muted">
                <i className="ki-outline ki-sms fs-6 me-1"></i>
                <span className="fs-7">{businessPartnerData.email}</span>
              </div>
            </div>
          </div>

          {/* NGBLU Information */}
          <div className="card mb-4">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-4 mb-1">{t('ngbluInformation')}</span>
              </h3>
              <div className="card-toolbar">
                <i className="ki-outline ki-setting-2 fs-4 text-muted"></i>
              </div>
            </div>
            <div className="card-body py-3">
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('id')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.vatNumber}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('vatNumber')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.vatNumber}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('address')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.addressName}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('postalCode')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.postalCode}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('city')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.cityName}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('country')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.countryName}</p>
              </div>
              <div className="mb-0">
                <label className="form-label fw-bold text-gray-600 fs-7">{t('branche')}</label>
                <p className="text-gray-800 fs-7 mb-0">{businessPartnerData.brancheName}</p>
              </div>
            </div>
          </div>

          {/* Management Options */}
          <div className="card">
            <div className="card-body py-3">
              <div className="menu menu-column menu-rounded menu-sub-indention">
                <div className="menu-item">
                  <Link
                    href="/dashboard/workspace/ngblu-workspace/manage-business-partner"
                    className="menu-link py-3 px-0"
                  >
                    <span className="menu-icon">
                      <i className="ki-outline ki-people fs-4"></i>
                    </span>
                    <span className="menu-title fw-semibold">{t('manageBusinessPartner')}</span>
                    <span>
                      <i className="ki-outline ki-setting-2 fs-6"></i>
                    </span>
                  </Link>
                </div>
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
          <Card className="card-stretch" bg="light">
            {/* Search Bar */}
            <div className="d-flex align-items-center my-4">
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
          </Card>
        </Col>

        {/* Right Sidebar */}
        <Col lg={3}>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="fw-bold mb-0">{t('businessPartners')} (1015)</h6>
            <Link
              href="/dashboard/workspace/ngblu-workspace/manage-business-partner/create-new-business-partner"
              className="btn btn-sm btn-primary"
            >
              {t('createBusinessPartner')}
            </Link>
          </div>

          <BusinessPartnerSites businessPartnerId={businessPartnerId} />

          {/* Quotes Section */}
          <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold mb-0">{t('quotes')}</h6>
              <button className="btn btn-sm btn-primary">{t('createQuote')}</button>
            </div>
            <BusinessPartnerQuotes businessPartnerId={businessPartnerId} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
