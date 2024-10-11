import { ApiCore } from './api-core'

export class ProjectTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'projects/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `projects/types/${id}`, payload })
  }
}

export const projectTypeApi = new ProjectTypeApi()
