import * as Sentry from '@sentry/nextjs'
import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { createHmac } from 'crypto'
import sodium from 'libsodium-wrappers'
import { getSession } from 'next-auth/react'

import { ApiParams, RequestMethod } from './api-core.type'
import { getGeneralApiProblem } from './helpers/api-problem'
import { camelizeKeys, snakeCaseKeys } from './helpers/object'
import { serialize } from './helpers/serialize-formdata'

export class ApiCore {
  protected baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
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

  protected async generateSignature(clientPrivateKey: string, message: string): Promise<string> {
    const serverPublicKey = process.env.NEXT_PUBLIC_SERVER_PUBLIC_KEY as string
    const sharedSecret = sodium.crypto_scalarmult(
      sodium.from_base64(clientPrivateKey, sodium.base64_variants.ORIGINAL),
      sodium.from_base64(serverPublicKey, sodium.base64_variants.ORIGINAL)
    )
    const hmac = createHmac('sha256', sharedSecret).update(message).digest('hex')
    return hmac
  }

  protected buildQueryParams(params: Record<string, any>): string {
    // Create array to hold parameter pairs instead of using URLSearchParams
    const queryParts: string[] = []

    // Add non-filter parameters first (limit, page, etc)
    const nonFilterKeys = Object.keys(params).filter(key => key !== 'filter')
    nonFilterKeys.forEach(key => {
      const value = params[key]
      if (value !== undefined && value !== null) {
        // Use PHP-compatible encoding
        queryParts.push(`${key}=${this.phpCompatibleEncode(String(value))}`)
      }
    })

    // Add filter parameters last and include empty values
    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        // Include empty values for filter parameters
        const valueStr = value === null || value === undefined ? '' : String(value)

        // Use PHP-compatible encoding
        queryParts.push(`filter[${key}]=${this.phpCompatibleEncode(valueStr)}`)
      })
    }

    return queryParts.join('&')
  }

  /**
   * Simple encoding function that matches PHP's urlencode behavior for query strings
   * PHP uses the application/x-www-form-urlencoded format, which encodes spaces as +
   */
  private phpCompatibleEncode(str: string): string {
    // This simulates PHP's urlencode function which is used for query parameters
    return encodeURIComponent(str)
      .replace(/%20/g, '+') // Replace space with + (this is the key difference from encodeURIComponent)
      .replace(/%2C/g, ',') // Keep commas as is (frequently seen in filter values)
      .replace(/%40/g, '@') // Keep @ as is (frequently seen in emails)
      .replace(/%2B/g, '+') // Keep + as is (frequently seen in filter values)
      .replace(/%2E/g, '.') // Keep . as is (frequently seen in filter values)
  }

  protected getUrl(request: any): string {
    const { baseURL, url, params } = request
    const queryString = params ? this.buildQueryParams(params) : ''

    // Handle the case where url starts with a slash to prevent double slashes
    const path = url.startsWith('/') ? url : `/${url}`
    return `${baseURL.replace(/\/+$/, '')}${path}${queryString ? `?${queryString}` : ''}`
  }

  protected async addHeaderTransformer() {
    this.api.addAsyncRequestTransform(async request => {
      request.headers = request.headers || {}

      const timestamp = new Date().toISOString()
      const url = this.getUrl(request)
      const method = request.method?.toUpperCase() || ''
      const body = request.data ? JSON.stringify(request.data) : ''
      const message =
        method !== 'GET' ? `${timestamp}${method}${url}${body}` : `${timestamp}${method}${url}`

      const session = await getSession()

      if (session?.accessToken && session?.clientPrivateKey) {
        const signature = await this.generateSignature(session.clientPrivateKey, message)
        request.headers['X-Signature'] = signature
        request.headers['X-Timestamp'] = timestamp
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
      // Skip transforming if already FormData (preserve the original FormData)
      if (request.data instanceof FormData) {
        return
      }

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
      timeout: 120000,
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
      if (problem) {
        // Add Sentry error reporting for failed API calls
        Sentry.captureMessage('API request failed', {
          level: 'error',
          extra: {
            status: response.status,
            problem: response.problem,
            url: response.config?.url,
            method: response.config?.method,
            data: typeof response.data === 'object' ? response.data : undefined,
          },
        })
        return Promise.reject(problem)
      }
    }

    return Promise.resolve(response)
  }

  protected async callApi(method: RequestMethod, { path, payload, headers }: ApiParams) {
    try {
      const config: any = {
        baseURL: this.baseURL,
      }

      if (headers) {
        config.headers = headers
      }

      const response: ApiResponse<any> = await this.api[method](path, payload, config)

      return await this.processResult(response)
    } catch (error) {
      // Capture any unexpected errors during API calls
      console.error(`ApiCore.callApi error for ${method} ${path}:`, error)
      Sentry.captureException(error, {
        extra: {
          method,
          path,
          payload: typeof payload === 'object' ? payload : undefined,
        },
      })
      throw error
    }
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
