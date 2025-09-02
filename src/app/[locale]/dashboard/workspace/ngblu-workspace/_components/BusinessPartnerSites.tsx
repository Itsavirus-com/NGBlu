'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { BusinessPartnerSite } from '../_types/business-partner.types'

type BusinessPartnerSitesProps = {
  businessPartnerId: string
}

export const BusinessPartnerSites = ({ businessPartnerId }: BusinessPartnerSitesProps) => {
  const t = useTranslations('workspace.businessPartner')

  // Mock data - replace with actual API call
  const mockSites: BusinessPartnerSite[] = [
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

  return (
    <div>
      {mockSites.map((site, index) => (
        <div key={site.id} className="mb-3">
          <div className="card border border-gray-300">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-30px me-3">
                  <div className="symbol-label bg-light-primary">
                    <span className="text-primary fw-bold fs-7">N</span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-bold text-primary fs-7">{site.name}</h6>
                  <p className="mb-1 text-gray-600 fs-8">{t('generalInformation')}</p>
                  <p className="mb-1 text-gray-600 fs-8">{t('phoneNumber')}</p>
                  <p className="mb-0 text-gray-600 fs-8">{t('address')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Show More Button */}
      <div className="text-center mt-3">
        <Link
          href="/dashboard/workspace/ngblu-workspace/manage-business-partner/business-partner-overview"
          className="btn btn-sm btn-light-primary fw-bold"
        >
          {t('showMore')}
        </Link>
      </div>
    </div>
  )
}
