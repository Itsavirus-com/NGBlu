import { ApiCore } from './api-core'

export class UserProfileApi extends ApiCore {
  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `users/profile/${id}`, payload })
  }
}

export const userProfileApi = new UserProfileApi()
