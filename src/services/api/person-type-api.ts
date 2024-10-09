import { ApiCore } from './api-core'

export class PersonTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'persons/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `persons/types/${id}`, payload })
  }
}

export const personTypeApi = new PersonTypeApi()
