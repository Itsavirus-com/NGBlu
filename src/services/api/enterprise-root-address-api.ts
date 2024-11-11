import { ApiCore } from './api-core'

export class EnterpriseRootAddressApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `enterprise-roots/${enterpriseRootId}/addresses`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `enterprise-roots/${enterpriseRootId}/addresses/${id}`, payload })
  }
}

export const enterpriseRootAddressApi = new EnterpriseRootAddressApi()
