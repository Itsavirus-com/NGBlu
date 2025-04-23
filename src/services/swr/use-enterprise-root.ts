import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRoot } from './models/enterprise-root.type'
import { Namespace } from './models/namespace.type'

export const useEnterpriseRoot = (enterpriseRoot?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRoot>(
    () =>
      enterpriseRoot && {
        path: `enterprise-roots/${enterpriseRoot}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}

export const useEnterpriseRootNamespace = (enterpriseRoot?: number) => {
  const { data, mutate, isLoading } = useSWR<Namespace>(
    () =>
      enterpriseRoot && {
        path: `enterprise-roots/${enterpriseRoot}/namespace`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}

export const useEnterpriseRootProjectNamespace = (
  enterpriseRootId?: number,
  projectId?: number
) => {
  const {
    data: response,
    mutate,
    isLoading,
  } = useSWR<{ data: Namespace[] }>(
    () =>
      enterpriseRootId &&
      projectId && {
        path: `enterprise-roots/${enterpriseRootId}/projects/${projectId}/namespace`,
      }
  )

  const data = response?.data

  return { data, mutate, isLoading }
}

export const useEnterpriseRootCustomerNamespace = (
  enterpriseRootId?: number,
  customerId?: number
) => {
  const {
    data: response,
    mutate,
    isLoading,
  } = useSWR<{ data: Namespace[] }>(
    () =>
      enterpriseRootId &&
      customerId && {
        path: `enterprise-roots/${enterpriseRootId}/customers/${customerId}/namespace`,
      }
  )

  const data = response?.data

  return { data, mutate, isLoading }
}
