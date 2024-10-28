import { ApiCore } from './api-core'

export class ProjectInfoApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'projects/infos', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `projects/infos/${id}`, payload })
  }
}

export const projectInfoApi = new ProjectInfoApi()
