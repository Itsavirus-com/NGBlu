import { ApiCore } from './api-core'

export class CompanyStatusApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'companies/statuses', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `companies/statuses/${id}`, payload })
  }
}

export const companyStatusApi = new CompanyStatusApi()
