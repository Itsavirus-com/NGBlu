import { ApiCore } from './api-core'

export class VerifyEmailApi extends ApiCore {
  async verifyEmail(payload: Record<string, any>) {
    return await this.patch({ path: 'users/profile/verify-email', payload })
  }
}

export const verifyEmailApi = new VerifyEmailApi()
