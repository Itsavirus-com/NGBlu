import { ApiCore } from './api-core'

export class CompanyApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'companies/infos', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `companies/infos/${id}`, payload })
  }
}

export const companyApi = new CompanyApi()
