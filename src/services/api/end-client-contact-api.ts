import { ApiCore } from './api-core'

export class EndClientContactApi extends ApiCore {
  async new(id: number, payload: Record<string, any>) {
    return await this.post({ path: `end-clients/${id}/contacts`, payload })
  }

  async update(id: number, contactId: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/${id}/contacts/${contactId}`, payload })
  }
}

export const endClientContactApi = new EndClientContactApi()
