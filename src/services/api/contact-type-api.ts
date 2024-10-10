import { ApiCore } from './api-core'

export class ContactTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'contacts/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `contacts/types/${id}`, payload })
  }
}

export const contactTypeApi = new ContactTypeApi()
