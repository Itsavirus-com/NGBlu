import { ApiCore } from './api-core'

export class ValidateTokenUserApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'users/profile/validate-token', payload })
  }
}

export const validateTokenUserApi = new ValidateTokenUserApi()
