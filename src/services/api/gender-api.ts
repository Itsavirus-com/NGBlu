import { ApiCore } from './api-core'

export class GenderApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'genders', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `genders/${id}`, payload })
  }
}

export const genderApi = new GenderApi()
