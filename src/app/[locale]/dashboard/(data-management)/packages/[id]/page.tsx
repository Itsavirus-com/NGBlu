'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { PackageProduct, PackageService } from '@/services/swr/models/package.type'
import { usePackage } from '@/services/swr/use-package'
import { safeRender } from '@/utils/safeRender'

import { PackageProductFilter } from './_components/PackageProductFilter'
import { PackageServiceFilter } from './_components/PackageServiceFilter'

export default function PackageDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { data, isLoading } = usePackage(params.id)

  const serviceColumns: TableColumn<PackageService>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'service',
      title: t('service'),
      render: row => safeRender(row, 'service.name'),
    },
    {
      id: 'servicePricingConfig',
      title: t('servicePricingConfig'),
      render: row => safeRender(row, 'servicePricingConfig.pricePlan.name'),
    },
  ]

  const productColumns: TableColumn<PackageProduct>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'product',
      title: t('product'),
      render: row => safeRender(row, 'product.name'),
    },
    {
      id: 'productPricingConfig',
      title: t('productPricingConfig'),
      render: row => safeRender(row, 'productPricingConfig.pricePlan.name'),
    },
  ]

  const packageInfoFields = [
    { label: t('name'), value: safeRender(data, 'name') },
    { label: t('type'), value: safeRender(data, 'packageType.name') },
    {
      label: t('price'),
      value: `${safeRender(data, 'priceConfig.priceCurrency.currency')} ${safeRender(
        data,
        'priceConfig.priceValue'
      )}`,
    },
    {
      label: t('priceUnit'),
      value: safeRender(data, 'priceConfig.priceUnit.unit'),
    },
    {
      label: t('priceInterval'),
      value: safeRender(data, 'priceConfig.priceInterval.name'),
    },
    {
      label: t('priceType'),
      value: safeRender(data, 'priceConfig.priceType.type'),
    },
    {
      label: t('tax'),
      value: `${safeRender(data, 'priceConfig.priceTax.country.currency')} ${safeRender(
        data,
        'priceConfig.priceTax.taxValue'
      )} / ${safeRender(data, 'priceConfig.priceTax.priceUnit.unit')}`,
    },
  ]

  const tabs = [
    {
      eventKey: 'packageInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={packageInfoFields}
          isLoading={isLoading}
          translation="dataManagement.packages"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'packageServices',
      title: t('services.title'),
      content: (
        <Table<PackageService>
          className="mt-4"
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
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'packageProducts',
      title: t('products'),
      content: (
        <Table<PackageProduct>
          className="mt-4"
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
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('package')}: ${safeRender(data, 'name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="packageInfo" />
    </>
  )
}
