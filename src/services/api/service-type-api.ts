import { ApiCore } from './api-core'

export class ServiceTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'services/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `services/types/${id}`, payload })
  }
}

export const serviceTypeApi = new ServiceTypeApi()
