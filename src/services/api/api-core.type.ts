import { GeneralApiProblem } from './helpers/api-problem.type'

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Payload = Record<string, any>

export interface ApiParams {
  path: string

  payload?: Payload
}

export interface ApiSuccessResult<Data = any> {
  ok: true

  data: Data
}

export type ApiResult = ApiSuccessResult | GeneralApiProblem
