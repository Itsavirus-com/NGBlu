import { ApiCore } from './api-core'

export class SWRApi extends ApiCore {
  async fetch(path: string, params?: Record<string, any>) {
    return await this.get({ path, payload: params })
  }
}

export const swrApi = new SWRApi()
