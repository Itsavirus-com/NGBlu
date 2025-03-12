import { ApiCore } from './api-core'

export class PasswordResetApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'reset-password', payload })
  }
}

export const passwordResetApi = new PasswordResetApi()
