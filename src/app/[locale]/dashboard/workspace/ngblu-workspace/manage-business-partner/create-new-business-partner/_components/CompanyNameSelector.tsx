'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { KTIcon } from '@/components/kt-icon/KtIcon'

interface CompanyNameSelectorProps {
  kvkTradeNames?: string[]
  isKvkSuccess?: boolean
}

export const CompanyNameSelector = ({
  kvkTradeNames = [],
  isKvkSuccess = false,
}: CompanyNameSelectorProps) => {
  const t = useTranslations('dataManagement.createBusinessPartner.businessProfile')
  const { setValue } = useFormContext()
  const [showManualInput, setShowManualInput] = useState(false)

  // Create options for the select dropdown
  const companyNameOptions = [
    ...kvkTradeNames.map(name => ({ label: name, value: name })),
    { label: 'Custom company name...', value: 'custom' },
  ]

  // If no trade names available, show manual input
  if (isKvkSuccess && kvkTradeNames.length === 0) {
    return (
      <Row>
        <Col md={12}>
          <div className="mb-5">
            <div className="alert alert-info mb-3">
              <div className="d-flex align-items-center">
                <KTIcon iconType="duotone" iconName="information" className="text-info me-2" />
                <span>{t('noTradeNamesFound')}</span>
              </div>
            </div>
            <ControlledInput
              name="name"
              label={t('companyName')}
              placeholder={t('companyNamePlaceholder')}
              containerClass="mb-5"
              isRequired
            />
          </div>
        </Col>
      </Row>
    )
  }

  const handleCompanyNameChange = (value: string | number | null) => {
    if (value === 'custom') {
      setShowManualInput(true)
      setValue('name', '')
    } else if (typeof value === 'string') {
      setShowManualInput(false)
      setValue('name', value)
    }
  }

  return (
    <Row>
      <Col md={12}>
        {isKvkSuccess && kvkTradeNames.length > 0 ? (
          // Show dropdown with KVK trade names
          <div className="mb-5">
            <label className="form-label fw-bold">
              {t('companyName')} <span className="text-danger">*</span>
            </label>
            <div className="d-flex align-items-center gap-3">
              <div className="flex-grow-1">
                <ControlledSelect
                  name="name"
                  options={companyNameOptions}
                  onChange={handleCompanyNameChange}
                  containerClass="mb-0"
                  option={{ label: (row: any) => row.label, value: (row: any) => row.value }}
                />
              </div>
              <div className="text-muted small">
                <KTIcon iconType="duotone" iconName="shield-tick" className="text-success me-1" />
                {t('fromKvk')}
              </div>
            </div>
            <div className="form-text text-muted">
              {t('selectFromKvkNames')} {t('orChooseCustom')}
            </div>
          </div>
        ) : (
          // Show manual input
          <ControlledInput
            name="name"
            label={t('companyName')}
            placeholder={t('companyNamePlaceholder')}
            containerClass="mb-5"
            isRequired
          />
        )}

        {/* Manual input field - shown when "Custom" is selected or no KVK data */}
        {showManualInput && (
          <div className="mt-3">
            <ControlledInput
              name="name"
              label={t('customCompanyName')}
              placeholder={t('enterCustomCompanyName')}
              containerClass="mb-5"
              isRequired
            />
          </div>
        )}
      </Col>
    </Row>
  )
}
