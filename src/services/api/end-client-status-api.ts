import { ApiCore } from './api-core'

export class EndClientStatusApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'end-clients/statuses', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/statuses/${id}`, payload })
  }
}

export const endClientStatusApi = new EndClientStatusApi()
