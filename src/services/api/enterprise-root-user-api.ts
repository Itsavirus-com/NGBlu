import { ApiCore } from './api-core'

export class EnterpriseRootUserApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `enterprise-roots/${enterpriseRootId}/users`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `enterprise-roots/${enterpriseRootId}/users/${id}`, payload })
  }
}

export const enterpriseRootUserApi = new EnterpriseRootUserApi()
