'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { TextView } from '@/components/view/text-view/TextView'

import { WorkspaceInfo, WorkspaceType } from '../types/workspace.types'

type WorkspaceInfoViewProps = {
  workspaceData: WorkspaceInfo
  isLoading?: boolean
  translationNamespace?: string
}

export const WorkspaceInfoView = ({
  workspaceData,
  isLoading = false,
  translationNamespace,
}: WorkspaceInfoViewProps) => {
  const t = useTranslations(translationNamespace)

  const getWorkspaceTitle = (type: WorkspaceType) => {
    const titles = {
      ngblu: t('ngbluInformation'),
      'business-partner': t('businessPartnerInformation'),
      site: t('siteInformation'),
    }
    return titles[type] || t('workspaceInformation')
  }

  const workspaceInfoFields = [
    {
      label: getWorkspaceTitle(workspaceData.type),
      value: workspaceData.name,
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: '',
      value: workspaceData.companyUrl ? (
        <div className="d-flex align-items-center">
          <i className="ki-outline ki-global fs-5 me-2 text-primary"></i>
          <a
            href={`https://${workspaceData.companyUrl}`}
            className="text-primary text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            {workspaceData.companyUrl}
          </a>
        </div>
      ) : (
        '-'
      ),
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: '',
      value: workspaceData.phoneNumber ? (
        <div className="d-flex align-items-center">
          <i className="ki-outline ki-phone fs-5 me-2 text-muted"></i>
          <span>{workspaceData.phoneNumber}</span>
        </div>
      ) : (
        '-'
      ),
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: '',
      value: workspaceData.email ? (
        <div className="d-flex align-items-center">
          <i className="ki-outline ki-sms fs-5 me-2 text-muted"></i>
          <span>{workspaceData.email}</span>
        </div>
      ) : (
        '-'
      ),
      colProps: { xs: 12, md: 6, lg: 3 },
    },
  ]

  const additionalFields = [
    {
      label: t('vatNumber'),
      value: workspaceData.vatNumber || '-',
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('address'),
      value: workspaceData.addressName || '-',
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('postalCode'),
      value: workspaceData.postalCode || '-',
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('city'),
      value: workspaceData.cityName || '-',
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('country'),
      value: workspaceData.countryName || '-',
      colProps: { xs: 12, md: 6, lg: 3 },
    },
    {
      label: t('branche'),
      value: workspaceData.brancheName || '-',
      colProps: { xs: 12, md: 6, lg: 3 },
    },
  ]

  return (
    <div>
      {/* Header with Edit Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold fs-3 mb-0">{getWorkspaceTitle(workspaceData.type)}</h3>
        <Button icon="setting-2" colorClass="light" className="btn-sm" />
      </div>

      {/* Workspace Info Fields */}
      <Row>
        {workspaceInfoFields.map((field, index) => (
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
