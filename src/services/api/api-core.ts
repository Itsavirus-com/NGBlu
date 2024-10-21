import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { getSession } from 'next-auth/react'

import { ApiParams, RequestMethod } from './api-core.type'
import { getGeneralApiProblem } from './helpers/api-problem'
import { camelizeKeys, snakeCaseKeys } from './helpers/object'
import { serialize } from './helpers/serialize-formdata'

export class ApiCore {
  protected baseURL = `https://io2-api.development.ngblu.io/api`
  protected api: ApisauceInstance

  /**
   * Use multipart/form-data content type.
   * For file uploading
   */
  protected multipart = false

  /**
   * Enable blob response type.
   * For file downloading
   */
  protected enableBlobResponse = false

  /**
   * Convert request object key to snake case.
   */
  protected useSnakedKey = true

  /**
   * Add a wrapper object around passed data.
   */
  protected payloadWrapper?: string

  protected addHeaderTransformer() {
    this.api.addAsyncRequestTransform(request => async () => {
      if (!request.headers) request.headers = {}

      const session = await getSession()

      if (session?.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`
      }

      if (this.multipart) {
        request.headers['Content-Type'] = 'multipart/form-data'
      }
    })
  }

  protected addResponseTypeTransformer() {
    this.api.addRequestTransform(request => {
      if (this.enableBlobResponse) {
        request.responseType = 'blob'
      }
    })
  }

  protected addRequestParamsTransformer() {
    this.api.addRequestTransform(request => {
      if (this.useSnakedKey) {
        request.params = snakeCaseKeys(request.params)
      }
    })
  }

  protected addPayloadTransformer() {
    this.api.addRequestTransform(request => {
      const data = this.payloadWrapper ? { [this.payloadWrapper]: request.data } : request.data

      if (this.multipart) {
        request.data = serialize(data, {
          nullsAsUndefined: true,
          useSnakedKey: this.useSnakedKey,
        })
      } else {
        request.data = this.useSnakedKey ? snakeCaseKeys(data) : data
      }
    })
  }

  protected addResponseTransformer() {
    this.api.addResponseTransform(response => {
      if (this.useSnakedKey) {
        response.data = camelizeKeys(response.data)
      }
    })
  }

  constructor() {
    this.api = create({
      timeout: 10000,
      baseURL: this.baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    this.addHeaderTransformer()
    this.addResponseTypeTransformer()
    this.addRequestParamsTransformer()
    this.addPayloadTransformer()
    this.addResponseTransformer()
  }

  protected async processResult(response: ApiResponse<any>) {
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return Promise.reject(problem)
    }

    return Promise.resolve(response)
  }

  protected async callApi(method: RequestMethod, { path, payload }: ApiParams) {
    const response: ApiResponse<any> = await this.api[method](path, payload, {
      baseURL: this.baseURL,
    })

    return await this.processResult(response)
  }

  protected async get(apiParams: ApiParams) {
    return await this.callApi('get', apiParams)
  }

  protected async post(apiParams: ApiParams) {
    return await this.callApi('post', apiParams)
  }

  protected async put(apiParams: ApiParams) {
    return await this.callApi('put', apiParams)
  }

  protected async patch(apiParams: ApiParams) {
    return await this.callApi('patch', apiParams)
  }

  protected async delete(apiParams: ApiParams) {
    return await this.callApi('delete', apiParams)
  }
}
