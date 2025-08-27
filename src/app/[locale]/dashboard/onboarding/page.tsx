'use client'

import { Col, Row } from 'react-bootstrap'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { Page } from '@/components/page/page'
import { Link } from '@/navigation'

export default function OnboardingPage() {
  const breadcrumbItems = [{ name: 'Onboarding', path: '/dashboard/onboarding', type: 'dashboard' }]

  return (
    <Page title="Onboarding" description="Get started with your business setup" className="pb-5">
      <Breadcrumbs items={breadcrumbItems} />

      <Row>
        <Col lg={4} md={6} className="mb-6">
          <div className="card card-bordered h-100">
            <div className="card-body d-flex flex-column">
              <div className="symbol symbol-50px symbol-circle mb-5">
                <div className="symbol-label bg-light-primary">
                  <i className="ki-duotone ki-profile-user text-primary fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                  </i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-3">Manage Business Partner</h3>
              <p className="text-muted mb-5 flex-grow-1">
                Create and manage business partner profiles, including KVK validation and contact
                information.
              </p>
              <Link
                href="/dashboard/onboarding/manage-business-partner"
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </Col>

        <Col lg={4} md={6} className="mb-6">
          <div className="card card-bordered h-100">
            <div className="card-body d-flex flex-column">
              <div className="symbol symbol-50px symbol-circle mb-5">
                <div className="symbol-label bg-light-warning">
                  <i className="ki-duotone ki-setting-3 text-warning fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                    <span className="path5"></span>
                  </i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-3">System Configuration</h3>
              <p className="text-muted mb-5 flex-grow-1">
                Configure system settings, integrations, and business rules for your organization.
              </p>
              <button className="btn btn-light-warning" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </Col>

        <Col lg={4} md={6} className="mb-6">
          <div className="card card-bordered h-100">
            <div className="card-body d-flex flex-column">
              <div className="symbol symbol-50px symbol-circle mb-5">
                <div className="symbol-label bg-light-success">
                  <i className="ki-duotone ki-chart text-success fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-3">Analytics Setup</h3>
              <p className="text-muted mb-5 flex-grow-1">
                Set up reporting and analytics dashboards to monitor your business performance.
              </p>
              <button className="btn btn-light-success" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Page>
  )
}
