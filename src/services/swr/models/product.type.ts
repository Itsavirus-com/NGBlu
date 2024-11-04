import { PricePlan } from './price-plan.type'

export type ProductPriceConfig = {
  id: number
  activeFrom: string
  activeTo: string
  product: Product
  pricePlan: PricePlan
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: number
  name: string
  description: string
  productTypeId: number
  productType: {
    id: string
    productType: string
    createdAt: string
    updatedAt: string
  }
  pricePlans: PricePlan[]
  productPriceConfigs: ProductPriceConfig[]
  corporateProductOnly: boolean
  consumerProductOnly: boolean
  category: string
  createdAt: string
  updatedAt: string
}
