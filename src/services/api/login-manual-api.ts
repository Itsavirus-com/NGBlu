import { ApiCore } from './api-core'

export class LoginManualApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'login', payload })
  }
}

export const loginManualApi = new LoginManualApi()
