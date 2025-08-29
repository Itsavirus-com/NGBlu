import { ApiCore } from './api-core'

export class WorkspaceApi extends ApiCore {
  async getAvailable() {
    return await this.get({ path: 'workspaces/available' })
  }
}

export const workspaceApi = new WorkspaceApi()
