import { ApiCore } from './api-core'

export class EnterpriseRootContactApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `enterprise-roots/${enterpriseRootId}/contacts`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `enterprise-roots/${enterpriseRootId}/contacts/${id}`, payload })
  }
}

export const enterpriseRootContactApi = new EnterpriseRootContactApi()
