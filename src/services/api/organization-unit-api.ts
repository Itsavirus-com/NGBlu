import { ApiCore } from './api-core'

export class OrganizationUnitApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'organisational-units', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `organisational-units/${id}`, payload })
  }
}

export const organizationUnitApi = new OrganizationUnitApi()
