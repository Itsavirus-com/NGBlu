'use client'

import { Col, Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { Link } from '@/navigation'

export default function ManageBusinessPartnerPage() {
  return (
    <Page
      title="Manage Business Partner"
      description="Create and manage your business partner profiles"
      className="pb-5"
    >
      <Row>
        <Col lg={6} md={6} className="mb-6">
          <div className="card card-bordered h-100">
            <div className="card-body d-flex flex-column">
              <div className="symbol symbol-50px symbol-circle mb-5">
                <div className="symbol-label bg-light-primary">
                  <i className="ki-duotone ki-plus text-primary fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-3">Create a New Business Partner</h3>
              <p className="text-muted mb-5 flex-grow-1">
                Start the process of adding a new business partner to your system.
              </p>
              <Link
                href="/dashboard/onboarding/manage-business-partner/create-new-business-partner"
                className="btn btn-primary"
              >
                Create New Partner
              </Link>
            </div>
          </div>
        </Col>

        <Col lg={6} md={6} className="mb-6">
          <div className="card card-bordered h-100">
            <div className="card-body d-flex flex-column">
              <div className="symbol symbol-50px symbol-circle mb-5">
                <div className="symbol-label bg-light-info">
                  <i className="ki-duotone ki-element-11 text-info fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                  </i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-3">View Existing Partners</h3>
              <p className="text-muted mb-5 flex-grow-1">
                Browse and manage your existing business partner database.
              </p>
              <button className="btn btn-light-info" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Page>
  )
}
