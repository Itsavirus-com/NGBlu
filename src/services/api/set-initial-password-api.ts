import { ApiCore } from './api-core'

export class SetInitialPasswordApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.patch({ path: 'users/profile/set-initial-password', payload })
  }
}

export const setInitialPasswordApi = new SetInitialPasswordApi()
