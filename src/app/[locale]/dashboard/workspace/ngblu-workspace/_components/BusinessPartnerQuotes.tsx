'use client'

import { useTranslations } from 'next-intl'
import { Badge } from 'react-bootstrap'

import { BusinessPartnerQuote } from '../_types/business-partner.types'

type BusinessPartnerQuotesProps = {
  businessPartnerId: string
}

export const BusinessPartnerQuotes = ({ businessPartnerId }: BusinessPartnerQuotesProps) => {
  const t = useTranslations('workspace.businessPartner')

  // Mock data - replace with actual API call
  const mockQuotes: BusinessPartnerQuote[] = [
    {
      id: 1,
      amount: 1250.0,
      currency: 'EUR',
      closeDate: '23 April 2025',
      stage: 'Quote being reviewed',
    },
    {
      id: 2,
      amount: 850.0,
      currency: 'EUR',
      closeDate: '29 April 2025',
      stage: 'Quote being reviewed',
    },
  ]

  return (
    <div>
      {mockQuotes.map(quote => (
        <div key={quote.id} className="card border border-gray-300 mb-3">
          <div className="card-body p-3">
            <div className="d-flex align-items-center mb-3">
              <div className="symbol symbol-30px me-3">
                <div className="symbol-label bg-light-primary">
                  <span className="text-primary fw-bold fs-7">N</span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-bold text-primary fs-7">{t('quote')}</h6>
              </div>
            </div>

            <div className="mb-2">
              <span className="fw-bold text-gray-600 fs-8">{t('amount')}: ---</span>
            </div>

            <div className="mb-2">
              <span className="fw-bold text-gray-600 fs-8">
                {t('closeDate')}: {quote.closeDate}
              </span>
            </div>

            <div className="mb-0">
              <span className="fw-bold text-gray-600 fs-8">{t('stage')}: </span>
              <Badge bg="warning" className="fs-8">
                {quote.stage}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
