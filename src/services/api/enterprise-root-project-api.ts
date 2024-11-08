import { ApiCore } from './api-core'

export class EnterpriseRootProjectApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `enterprise-roots/${enterpriseRootId}/projects`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `enterprise-roots/${enterpriseRootId}/projects/${id}`, payload })
  }
}

export const enterpriseRootProjectApi = new EnterpriseRootProjectApi()
