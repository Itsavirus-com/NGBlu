'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { ProductPriceConfig } from '@/services/swr/models/product.type'
import { useProduct } from '@/services/swr/use-product'
import { safeRender } from '@/utils/safeRender'

export default function ProductDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.products')

  const { data } = useProduct(params.id)

  const getPriceConfig = (pricePlan: PricePlan): PriceConfig =>
    pricePlan?.priceConfig || pricePlan?.fallbackPriceConfig || {}

  const pricePlanColumns: TableColumn<PricePlan>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'name',
      title: t('name'),
      render: row => safeRender(row, 'name'),
    },
    {
      id: 'price',
      title: t('price'),
      render: row =>
        `${safeRender(getPriceConfig(row), 'priceCurrency.currency')} ${safeRender(getPriceConfig(row), 'priceValue')}`,
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => safeRender(getPriceConfig(row), 'priceUnit.unit'),
    },
    {
      id: 'interval',
      title: t('interval'),
      render: row => safeRender(getPriceConfig(row), 'priceInterval.name'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(getPriceConfig(row), 'priceType.type'),
    },
    {
      id: 'tax',
      title: t('tax'),
      render: row =>
        `${safeRender(getPriceConfig(row).priceTax, 'country.currency')} ${safeRender(getPriceConfig(row).priceTax, 'taxValue')} / ${safeRender(getPriceConfig(row).priceTax, 'priceUnit.unit')}`,
    },
    {
      id: 'default',
      title: t('default'),
      render: row => (row.isDefault ? 'Yes' : 'No'),
    },
  ]

  const priceConfigColumns: TableColumn<ProductPriceConfig>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'activeFrom',
      title: t('activeFrom'),
      render: row => safeRender(row, 'activeFrom'),
    },
    {
      id: 'activeTo',
      title: t('activeTo'),
      render: row => safeRender(row, 'activeTo'),
    },
    {
      id: 'pricePlan',
      title: t('pricePlan'),
      render: row => `${safeRender(row.pricePlan, 'id')} | ${safeRender(row.pricePlan, 'name')}`,
    },
  ]

  const tabs = [
    {
      eventKey: 'pricePlans',
      title: t('pricePlans'),
      content: (
        <Table<PricePlan> className="mt-6" columns={pricePlanColumns} data={data?.pricePlans} />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'priceConfigs',
      title: t('priceConfigs'),
      content: (
        <Table<ProductPriceConfig>
          className="mt-6"
          columns={priceConfigColumns}
          data={data?.productPriceConfigs}
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle
        title={`${t('product')}: ${safeRender(data, 'name')}`}
        description={data?.description}
      />
      <DynamicTabs tabs={tabs} defaultActiveKey="pricePlans" />
    </>
  )
}
