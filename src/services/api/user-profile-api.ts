import { ApiCore } from './api-core'

export class UserProfileApi extends ApiCore {
  async update(payload: Record<string, any>) {
    return await this.put({ path: 'users/profile', payload })
  }

  async updatePassword(payload: Record<string, any>) {
    return await this.patch({ path: 'users/profile/password', payload })
  }

  async verifyPassword(payload: Record<string, any>) {
    return await this.post({ path: 'users/profile/verify-password', payload })
  }
}

export const userProfileApi = new UserProfileApi()
