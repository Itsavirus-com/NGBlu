import { ApiCore } from './api-core'

export class CountryApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'countries', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `countries/${id}`, payload })
  }
}

export const countryApi = new CountryApi()
