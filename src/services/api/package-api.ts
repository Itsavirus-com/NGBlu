import { ApiCore } from './api-core'

export class PackageApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'packages', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `packages/${id}`, payload })
  }
}

export const packageApi = new PackageApi()
