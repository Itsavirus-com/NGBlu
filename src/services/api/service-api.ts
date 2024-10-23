import { ApiCore } from './api-core'

export class ServiceApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'services', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `services/${id}`, payload })
  }
}

export const serviceApi = new ServiceApi()
