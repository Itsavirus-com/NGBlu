export interface ProductSubcategory {
  id: number
  productCategory: string
  parentId: number
  productCategoryLayerId: number
  createdAt: string
  updatedAt: string
}

export interface ProductCategory {
  id: number
  productCategory: string
  parentId: number
  productCategoryLayerId: number
  subcategories: ProductSubcategory[]
  createdAt: string
  updatedAt: string
}

export interface ProductLayer {
  id: number
  layer: string
  categories: ProductCategory[]
  createdAt: string
  updatedAt: string
}

export interface ProductCategoryHierarchyResponse {
  success: boolean
  message: null | string
  data: ProductLayer[]
}
