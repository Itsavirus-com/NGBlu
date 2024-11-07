import { ApiCore } from './api-core'

export class EndClientProjectApi extends ApiCore {
  async new(id: number, payload: Record<string, any>) {
    return await this.post({ path: `end-clients/${id}/projects`, payload })
  }

  async update(id: number, projectId: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/${id}/projects/${projectId}`, payload })
  }
}

export const endClientProjectApi = new EndClientProjectApi()
