'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'

import { BusinessPartnerTableData } from '../../_types/business-partner.types'

const BusinessPartnerOverview = () => {
  const t = useTranslations('workspace.businessPartner')
  const [activeTab, setActiveTab] = useState('all')

  // Mock data for business partners - replace with actual API call
  const businessPartners: BusinessPartnerTableData[] = [
    {
      id: 1,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
    {
      id: 2,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
    {
      id: 3,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
    {
      id: 4,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
    {
      id: 5,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
    {
      id: 6,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
    {
      id: 7,
      customerName: 'BLU',
      email: 'Test Name',
      createdDate: 'Yesterday at 12:00',
      phoneNumber: '+316 12 34 56 78',
      kvkNr: '53517777',
      ngAddress: 'Test address',
      vatNr: 'NL801776274729',
    },
  ]

  const columns: TableColumn<BusinessPartnerTableData>[] = [
    {
      id: 'customerName',
      title: t('customerName'),
      render: row => (
        <div className="d-flex align-items-center">
          <div className="symbol symbol-40px me-3">
            <div className="symbol-label bg-light-primary">
              <span className="text-primary fw-bold fs-6">B</span>
            </div>
          </div>
          <span className="fw-bold text-primary">{row.customerName}</span>
        </div>
      ),
    },
    {
      id: 'email',
      title: t('email'),
      render: row => <span>{row.email}</span>,
    },
    {
      id: 'createdDate',
      title: t('createdDate'),
      render: row => <span className="text-muted">{row.createdDate}</span>,
    },
    {
      id: 'phoneNumber',
      title: t('phoneNumber'),
      render: row => <span>{row.phoneNumber}</span>,
    },
    {
      id: 'kvkNr',
      title: t('kvkNr'),
      render: row => <span>{row.kvkNr}</span>,
    },
    {
      id: 'ngAddress',
      title: t('ngAddress'),
      render: row => <span>{row.ngAddress}</span>,
    },
    {
      id: 'vatNr',
      title: t('vatNr'),
      render: row => <span>{row.vatNr}</span>,
    },
  ]

  return (
    <div className="app-container container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold fs-2 mb-1">{t('businessPartnerOverview')}</h1>
          <p className="text-muted mb-0">{t('customers')}</p>
        </div>
        <Button
          icon="plus"
          label={t('createBusinessPartner')}
          colorClass="primary"
          href="create-new-business-partner"
        />
      </div>

      {/* Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={key => setActiveTab(key || 'all')}>
        <Nav variant="tabs" className="mb-4 border-0">
          <Nav.Item>
            <Nav.Link eventKey="all" className="border-0 fw-semibold">
              {t('allBusinessPartners')}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my" className="border-0 fw-semibold">
              {t('myBusinessPartners')}
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="all">
            <Table<BusinessPartnerTableData>
              columns={columns}
              data={businessPartners}
              filters={
                <div className="position-relative">
                  <i className="ki-outline ki-magnifier fs-3 position-absolute ms-3 mt-3 text-muted"></i>
                  <input
                    type="text"
                    className="form-control ps-10 border-0 bg-light"
                    placeholder={t('searchNamePhoneNumberEtc')}
                  />
                </div>
              }
            />
          </Tab.Pane>
          <Tab.Pane eventKey="my">
            <Table<BusinessPartnerTableData>
              columns={columns}
              data={businessPartners.slice(0, 3)}
              filters={
                <div className="position-relative">
                  <i className="ki-outline ki-magnifier fs-3 position-absolute ms-3 mt-3 text-muted"></i>
                  <input
                    type="text"
                    className="form-control ps-10 border-0 bg-light"
                    placeholder={t('searchNamePhoneNumberEtc')}
                  />
                </div>
              }
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}

export default BusinessPartnerOverview
