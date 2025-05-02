import { ApiCore } from './api-core'

export class AddressValidationApi extends ApiCore {
  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `address-validations/${id}`, payload })
  }
}

export const addressValidationApi = new AddressValidationApi()
