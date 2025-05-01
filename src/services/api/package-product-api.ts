import { ApiCore } from './api-core'

export class PackageProductApi extends ApiCore {
  async new(packageId: number, payload: Record<string, any>) {
    return await this.post({ path: `packages/${packageId}/products`, payload })
  }

  async update(packageId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `packages/${packageId}/products/${id}`, payload })
  }
}

export const packageProductApi = new PackageProductApi()
