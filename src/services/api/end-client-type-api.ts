import { ApiCore } from './api-core'

export class EndClientTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'end-clients/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/types/${id}`, payload })
  }
}

export const endClientTypeApi = new EndClientTypeApi()
