'use client'

import { useTranslations } from 'next-intl'
import { Badge } from 'react-bootstrap'

import { WorkspaceQuote } from '../types/workspace.types'

type QuotesListProps = {
  quotes?: WorkspaceQuote[]
  isLoading?: boolean
  className?: string
  translationNamespace?: string
}

export const QuotesList = ({
  quotes = [],
  isLoading = false,
  className = '',
  translationNamespace,
}: QuotesListProps) => {
  const t = useTranslations(translationNamespace)

  // Mock data - replace with actual API call based on workspaceId
  const mockQuotes: WorkspaceQuote[] = [
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

  const dataToUse = quotes.length > 0 ? quotes : mockQuotes

  if (isLoading) {
    return (
      <div className={`d-flex justify-content-center py-4 ${className}`}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {dataToUse.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted">{t('noQuotesFound')}</p>
        </div>
      ) : (
        dataToUse.map(quote => (
          <div key={quote.id} className="card border border-gray-300 mb-3">
            <div className="card-body p-3">
              <div className="d-flex align-items-center mb-3">
                <div className="symbol symbol-30px me-3">
                  <div className="symbol-label bg-light-primary">
                    <span className="text-primary fw-bold fs-7">Q</span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold text-primary fs-7">{t('quote')}</h6>
                </div>
              </div>

              <div className="mb-2">
                <span className="fw-bold text-gray-600 fs-8">
                  {t('amount')}:{' '}
                  {quote.amount ? `${quote.currency} ${quote.amount.toFixed(2)}` : '---'}
                </span>
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
        ))
      )}
    </div>
  )
}
