import { PricePlan } from './price-plan.type'

export type ServicePriceConfig = {
  id: number
  activeFrom: string
  activeTo: string
  service: Service
  pricePlan: PricePlan
  orgUnitId: number
  businesspartnerId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type Service = {
  id: number
  name: string
  description: string
  serviceType: {
    id: string
    serviceType: string
    createdAt: string
    updatedAt: string
  }
  pricePlans: PricePlan[]
  servicePriceConfigs: ServicePriceConfig[]
  corporateOnlyService: boolean
  consumerOnlyService: boolean
  category: string
  createdAt: string
  updatedAt: string
}
