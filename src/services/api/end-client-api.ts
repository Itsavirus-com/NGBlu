import { ApiCore } from './api-core'

export class EndClientApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'end-clients', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/${id}`, payload })
  }
}

export const endClientApi = new EndClientApi()
