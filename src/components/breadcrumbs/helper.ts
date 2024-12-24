import { Namespace } from '@/services/swr/models/namespace.type'

/**
 * Type definition for the breadcrumb data, which can either be a single `Namespace` object
 * or an array of `Namespace` objects.
 */
export type BreadcrumbData = {
  namespace?: Namespace | Namespace[]
}

/**
 * A function to generate breadcrumb items from the provided `BreadcrumbData`.
 *
 * @param {BreadcrumbData} data - The data containing a `namespace` (either a single `Namespace` or an array of them).
 *
 * @returns {Array<{name: string, type: string, path: string}>} - An array of breadcrumb items, where each item
 * contains the `name`, `type`, and `path` properties.
 *
 * If the `namespace` is an array, it maps each item in the array to a breadcrumb. If the `namespace` is a single object,
 * it returns an array with just that item.
 */
export const getBreadcrumbItems = (
  data?: BreadcrumbData
): { name: string; type: string; path: string }[] => {
  if (!data || !data.namespace) return []

  if (Array.isArray(data.namespace)) {
    return data.namespace.map(item => ({
      name: item.name,
      type: item.type,
      path: item.path,
    }))
  }

  const item = data.namespace as Namespace
  return [
    {
      name: item.name,
      type: item.type,
      path: item.path,
    },
  ]
}

/**
 * A function that maps an API path to the corresponding application route.
 *
 * @param {string} path - The path received from the API.
 *
 * @returns {string} - The corresponding application route based on the path.
 *
 * The function splits the given API path by slashes and determines the category and ID.
 * It then returns the application route corresponding to the path's category.
 */
export const mapApiPathToAppRoute = (path: string): string => {
  const pathSegments = path.split('/').filter(Boolean) // Split the path and remove empty segments

  // Ensure we have at least two segments: category and dynamic ID
  if (pathSegments.length < 2) return '/' // Fallback if the path is invalid

  const category = pathSegments[pathSegments.length - 2] // Second to last segment is the category
  const id = pathSegments[pathSegments.length - 1] // Last segment is the ID

  // Handle the category logic and return the corresponding app route
  switch (category) {
    case 'enterprise-roots':
      return `/dashboard/enterprise-roots/${id}`
    case 'organisational-units':
      return `/dashboard/organization-units/${id}`
    case 'projects':
      return `/dashboard/project/projects/${id}`
    case 'business-partners':
      return `/dashboard/business-partners/${id}`
    case 'customers':
      return `/dashboard/end-clients/${id}`
    default:
      return '/' // Default route if the category doesn't match
  }
}
