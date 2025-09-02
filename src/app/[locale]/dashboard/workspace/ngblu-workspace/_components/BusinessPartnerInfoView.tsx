'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { TextView } from '@/components/view/text-view/TextView'

import { BusinessPartnerInfo } from '../_types/business-partner.types'

type BusinessPartnerInfoViewProps = {
  businessPartnerData: BusinessPartnerInfo
  isLoading?: boolean
}

export const BusinessPartnerInfoView = ({
  businessPartnerData,
  isLoading = false,
}: BusinessPartnerInfoViewProps) => {
  const t = useTranslations('workspace.businessPartner')

  const businessPartnerInfoFields = [
    {
      label: t('businessPartnerInformation'),
      value: businessPartnerData.name,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: '',
      value: (
        <div className="d-flex align-items-center">
          <i className="ki-outline ki-global fs-5 me-2 text-primary"></i>
          <a
            href={`https://${businessPartnerData.companyUrl}`}
            className="text-primary text-decoration-none"
          >
            {businessPartnerData.companyUrl}
          </a>
        </div>
      ),
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: '',
      value: (
        <div className="d-flex align-items-center">
          <i className="ki-outline ki-phone fs-5 me-2 text-muted"></i>
          <span>{businessPartnerData.phoneNumber}</span>
        </div>
      ),
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: '',
      value: (
        <div className="d-flex align-items-center">
          <i className="ki-outline ki-sms fs-5 me-2 text-muted"></i>
          <span>{businessPartnerData.email}</span>
        </div>
      ),
      colProps: { xs: 12, md: 6, lg: 3 },
    },
  ]

  const additionalFields = [
    {
      label: t('vatNumber'),
      value: businessPartnerData.vatNumber,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('addressName'),
      value: businessPartnerData.addressName,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('postalCode'),
      value: businessPartnerData.postalCode,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('cityName'),
      value: businessPartnerData.cityName,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('countryName'),
      value: businessPartnerData.countryName,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('brancheName'),
      value: businessPartnerData.brancheName,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
  ]

  return (
    <div>
      {/* Header with Edit Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold fs-3 mb-0">{t('businessPartnerInformation')}</h3>
        <Button icon="setting-2" colorClass="light" className="btn-sm" />
      </div>

      {/* Business Partner Info Fields */}
      <Row>
        {businessPartnerInfoFields.map((field, index) => (
          <TextView
            key={index}
            label={field.label}
            value={field.value as string}
            isLoading={isLoading}
            {...field.colProps}
            className="mb-3"
          />
        ))}
      </Row>

      {/* Additional Fields */}
      <Row className="mt-4">
        {additionalFields.map((field, index) => (
          <TextView
            key={index}
            label={field.label}
            value={field.value}
            isLoading={isLoading}
            {...field.colProps}
            className="mb-3"
          />
        ))}
      </Row>
    </div>
  )
}
