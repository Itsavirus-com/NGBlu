'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { PackageProduct, PackageService } from '@/services/swr/models/package.type'
import { usePackage } from '@/services/swr/use-package'

import { PackageProductFilter } from './components/package-product-filter'
import { PackageServiceFilter } from './components/package-service-filter'

export default function PackageDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { data, isLoading } = usePackage(params.id)

  const serviceColumns: TableColumn<PackageService>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'package',
      title: t('package'),
      render: row => row.package.name,
    },
    {
      id: 'service',
      title: t('service'),
      render: row => row.service.name,
    },
    {
      id: 'servicePricingConfig',
      title: t('servicePricingConfig'),
      render: row => row.servicePricingConfig.pricePlan.name,
    },
  ]

  const productColumns: TableColumn<PackageProduct>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'packageId',
      title: t('packageId'),
      render: row => row.packageId,
    },
    {
      id: 'productId',
      title: t('productId'),
      render: row => row.productId,
    },
    {
      id: 'productPricingConfigId',
      title: t('productPricingConfigId'),
      render: row => row.productPricingConfigId,
    },
  ]

  return (
    <>
      <PageTitle title={data?.name || ''} />

      <Page>
        <Row>
          <TextView className="my-3" isLoading={isLoading} label={t('name')} value={data?.name} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.packageType?.name}
          />
        </Row>

        <Row className="mt-6">
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('price')}
            value={`${data?.priceConfig?.priceCurrency?.currency} ${data?.priceConfig?.priceValue}`}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('priceUnit')}
            value={data?.priceConfig?.priceUnit?.unit}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('priceInterval')}
            value={data?.priceConfig?.priceInterval?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('priceType')}
            value={data?.priceConfig?.priceType?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('tax')}
            value={`${data?.priceConfig?.priceTax.country.currency} ${data?.priceConfig?.priceTax.taxValue} / ${data?.priceConfig?.priceTax.priceUnit.unit}`}
          />
        </Row>
      </Page>
      <Table<PackageService>
        className="mt-4"
        title={t('packageServices')}
        toolbars={[
          {
            icon: 'plus',
            label: t('newPackageService'),
            colorClass: 'light-primary',
            href: `${params.id}/services/new`,
          },
        ]}
        filters={<PackageServiceFilter />}
        columns={serviceColumns}
        apiPath={`packages/${params.id}/services`}
        actionBasePath={`${params.id}/services`}
        actions={['edit', 'delete']}
      />
      <Table<PackageProduct>
        className="mt-4"
        title={t('packageProducts')}
        toolbars={[
          {
            icon: 'plus',
            label: t('newPackageProduct'),
            colorClass: 'light-primary',
            href: `${params.id}/products/new`,
          },
        ]}
        filters={<PackageProductFilter />}
        columns={productColumns}
        apiPath={`packages/${params.id}/products`}
        actionBasePath={`${params.id}/products`}
        actions={['edit', 'delete']}
      />
    </>
  )
}
