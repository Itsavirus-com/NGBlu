import { ApiCore } from './api-core'

export class PersonApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'persons', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `persons/${id}`, payload })
  }
}

export const personApi = new PersonApi()
