import { ApiCore } from './api-core'

export class UserApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'users', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `users/${id}`, payload })
  }

  async blockUser(id: number, payload: Record<string, any>) {
    return await this.patch({ path: `users/${id}/blocked`, payload })
  }

  async resendActivationEmail(email: string) {
    return await this.post({
      path: 'users/resend-activation-email',
      payload: { email },
    })
  }
}

export const userApi = new UserApi()
