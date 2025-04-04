import { ApiResponse } from 'apisauce'

import { extractErrorMessage } from '@/utils/extract-error-message'

import { ApiErrorKind, GeneralApiProblem } from './api-problem.type'

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return { kind: ApiErrorKind.CONNECTION, temporary: true }
    case 'NETWORK_ERROR':
      return { kind: ApiErrorKind.CONNECTION, temporary: true }
    case 'TIMEOUT_ERROR':
      return { kind: ApiErrorKind.TIMEOUT, temporary: true }
    case 'SERVER_ERROR':
      return { kind: ApiErrorKind.SERVER }
    case 'UNKNOWN_ERROR':
      switch (response.status) {
        case 302:
          return { kind: ApiErrorKind.FOUND, temporary: true }
        default:
          return { kind: ApiErrorKind.UNKNOWN, temporary: true }
      }
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 400:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.BAD_DATA,
              message: errorMessage || response.data.message,
              detail: response.data.detail,
              relatedRecords: response.data.relatedRecords || [],
            }
          }
          return { kind: ApiErrorKind.BAD_DATA, errors: response.data?.errors }
        case 401:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.UNAUTHORIZED,
              message: errorMessage || response.data.message,
              errors: response.data.errors,
            }
          }
          return { kind: ApiErrorKind.UNAUTHORIZED }
        case 403:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.FORBIDDEN,
              message: errorMessage || response.data.message,
              errors: response.data.errors,
            }
          }
          return { kind: ApiErrorKind.FORBIDDEN }
        case 404:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.NOT_FOUND,
              message: errorMessage || response.data.message,
              errors: response.data.errors,
            }
          }
          return { kind: ApiErrorKind.NOT_FOUND }
        case 409:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.CONFLICT,
              message: errorMessage || response.data.message,
              errors: response.data.errors,
            }
          }
          return { kind: ApiErrorKind.CONFLICT }
        case 410:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.GONE,
              message: errorMessage || response.data.message,
              errors: response.data.errors,
            }
          }
          return { kind: ApiErrorKind.GONE }
        case 422:
          if (response.data && response.data.message) {
            // Extract the most specific error message
            const errorMessage = extractErrorMessage(response.data)
            return {
              kind: ApiErrorKind.UNPROCESSABLE,
              message: errorMessage || response.data.message,
              errors: response.data.errors,
            }
          }
          return { kind: ApiErrorKind.UNPROCESSABLE }
        default:
          return { kind: ApiErrorKind.REJECTED }
      }
    case 'CANCEL_ERROR':
    default:
      return undefined
  }
}
