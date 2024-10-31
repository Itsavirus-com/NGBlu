import { ApiCore } from './api-core'

export class ProjectApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'projects', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `projects/${id}`, payload })
  }
}

export const projectApi = new ProjectApi()
