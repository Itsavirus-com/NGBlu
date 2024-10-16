import { ApiCore } from './api-core'

export class PackageServiceApi extends ApiCore {
  async new(packageId: number, payload: Record<string, any>) {
    return await this.post({ path: `/packages/${packageId}/services`, payload })
  }

  async update(packageId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `/packages/${packageId}/services/${id}`, payload })
  }
}

export const packageServiceApi = new PackageServiceApi()
