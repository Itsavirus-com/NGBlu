import { ApiCore } from './api-core'

export class RequestPasswordResetApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'request-password-reset', payload })
  }
}

export const requestPasswordResetApi = new RequestPasswordResetApi()
