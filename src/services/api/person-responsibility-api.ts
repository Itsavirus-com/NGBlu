import { ApiCore } from './api-core'

export class PersonResponsibilityApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'persons/responsibilities', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `persons/responsibilities/${id}`, payload })
  }
}

export const personResponsibilityApi = new PersonResponsibilityApi()
