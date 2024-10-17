import { PackageType } from './package-type.type'
import { PriceConfig } from './price-config.type'
import { Service, ServicePriceConfig } from './service.type'

export type Package = {
  id: number
  name: string
  packageTypeId: number
  packageType: PackageType
  priceConfigId: number
  priceConfig: PriceConfig
  createdAt: string
  updatedAt: string
}

export type PackageService = {
  id: number
  packageId: string
  package: Package
  serviceId: string
  service: Service
  servicePricingConfigId: string
  servicePricingConfig: ServicePriceConfig
}

export type PackageProduct = {
  id: number
  packageId: string
  productId: string
  productPricingConfigId: string
}
