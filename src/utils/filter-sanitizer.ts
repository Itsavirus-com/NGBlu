/**
 * Utility functions for sanitizing filter values
 * This ensures special characters don't break the URL encoding and signature validation
 */

/**
 * Sanitizes filter values to allow only:
 * - Letters and numbers (alphanumeric)
 * - Spaces
 * - Commas (,)
 * - At sign (@)
 * All other special characters are removed
 * @param data The filter data object to sanitize
 * @returns A sanitized copy of the filter data
 */
export const sanitizeFilterValues = (data: Record<string, any>): Record<string, any> => {
  // Create a deep copy of the data to avoid modifying the original
  const sanitized = JSON.parse(JSON.stringify(data))

  // Check if there's a filter object
  if (sanitized.filter && typeof sanitized.filter === 'object') {
    // Process each filter field
    Object.keys(sanitized.filter).forEach(key => {
      const value = sanitized.filter[key]
      if (typeof value === 'string') {
        // Allow alphanumeric characters, spaces, commas, and @ symbol
        // The regex: keep word chars (\w) + spaces (\s) + comma (,) + at (@)
        sanitized.filter[key] = value.replace(/[^\w\s,@]/g, '')
      }
    })
  }

  return sanitized
}
