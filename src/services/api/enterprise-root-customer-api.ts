import { ApiCore } from './api-core'

export class EnterpriseRootCustomerApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `enterprise-roots/${enterpriseRootId}/customers`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `enterprise-roots/${enterpriseRootId}/customers/${id}`, payload })
  }
}

export const enterpriseRootCustomerApi = new EnterpriseRootCustomerApi()
