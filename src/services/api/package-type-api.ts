import { ApiCore } from './api-core'

export class PackageTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'packages/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `packages/types/${id}`, payload })
  }
}

export const packageTypeApi = new PackageTypeApi()
