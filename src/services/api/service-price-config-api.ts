import { ApiCore } from './api-core'

export class ServicePriceConfigApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'services/price-configs', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `services/price-configs/${id}`, payload })
  }
}

export const servicePriceConfigApi = new ServicePriceConfigApi()
