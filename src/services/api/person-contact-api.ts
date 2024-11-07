import { ApiCore } from './api-core'

export class PersonContactApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: `contacts/infos`, payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `contacts/infos/${id}`, payload })
  }
}

export const personContactApi = new PersonContactApi()
