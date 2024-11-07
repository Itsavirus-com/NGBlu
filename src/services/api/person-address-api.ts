import { ApiCore } from './api-core'

export class PersonAddressApi extends ApiCore {
  async new(personId: number, payload: Record<string, any>) {
    return await this.post({ path: `persons/${personId}/addresses`, payload })
  }

  async update(personId: number, id: number, payload: Record<string, any>) {
    return await this.put({ path: `persons/${personId}/addresses/${id}`, payload })
  }
}

export const personAddressApi = new PersonAddressApi()
