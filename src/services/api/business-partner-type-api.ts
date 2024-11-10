import { ApiCore } from './api-core'

export class BusinessPartnerTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'business-partners/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `business-partners/types/${id}`, payload })
  }
}

export const businessPartnerTypeApi = new BusinessPartnerTypeApi()
