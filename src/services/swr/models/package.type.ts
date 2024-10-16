import { PackageType } from './package-type.type'
import { PriceConfig } from './price-config.type'

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
  serviceId: string
  servicePricingConfigId: string
}
