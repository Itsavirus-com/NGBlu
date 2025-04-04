/**
 * Extracts error message from API responses
 *
 * Combines available error information:
 * - Includes both general message and specific field errors when available
 * - Formats detail information for better readability
 */
export function extractErrorMessage(data: any, defaultMessage = ''): string {
  if (!data) return defaultMessage

  const { detail, message } = data
  let errorMessage = message || ''

  // Case 1: Field validation errors ({detail: {password: ["Error message"]}})
  if (detail && typeof detail === 'object') {
    const fieldName = Object.keys(detail)[0]
    if (fieldName && Array.isArray(detail[fieldName]) && detail[fieldName].length > 0) {
      // If we have both message and detail, combine them
      if (errorMessage) {
        return `${errorMessage} ${detail[fieldName][0]}`
      }
      return detail[fieldName][0]
    }
  }

  // Case 2: String detail message ({detail: "Error message"})
  if (detail && typeof detail === 'string') {
    // If we have both message and detail, combine them
    if (errorMessage) {
      return `${errorMessage} ${detail}`
    }
    return detail
  }

  // Fallback to general message or default
  return errorMessage || defaultMessage
}
