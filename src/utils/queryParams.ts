/**
 * Gets a nested value from an object using a string path
 * @param obj The object to traverse
 * @param path Dot-notation path (e.g. "user.address.street")
 */
export const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj)
}

/**
 * Processes query parameters by extracting values from an object using path mappings
 * @param row The data object to extract values from
 * @param queryParams Object containing key-path pairs
 */
export const processQueryParams = <T extends Record<string, any>>(
  row: T,
  queryParams?: Record<string, string>
): Record<string, any> => {
  if (!queryParams) return {}

  const processedParams: Record<string, any> = {}
  for (const [key, path] of Object.entries(queryParams)) {
    processedParams[key] = getNestedValue(row, path)
  }
  return processedParams
}

/**
 * Extracts and parses search parameters from the URL
 * @param searchString The URL search string (e.g. "?key=value&other=123")
 * @returns Object with parsed search parameters
 */
export const getSearchQueryParams = (searchString: string): Record<string, string> => {
  const searchParams = new URLSearchParams(searchString)
  const params: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}
