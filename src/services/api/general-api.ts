import { ApiCore } from './api-core'

export class GeneralApi extends ApiCore {
  async deleteItem(path: string) {
    return await this.delete({ path })
  }
}

export const generalApi = new GeneralApi()
