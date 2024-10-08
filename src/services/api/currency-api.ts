import { ApiCore } from './api-core'

export class CurrencyApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/currencies', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/currencies/${id}`, payload })
  }
}

export const currencyApi = new CurrencyApi()
