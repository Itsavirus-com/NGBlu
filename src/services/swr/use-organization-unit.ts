import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Namespace } from './models/namespace.type'
import { OrganizationUnit } from './models/organization-unit.type'

export const useOrganizationUnit = (organizationUnitId?: number) => {
  const { data, mutate, isLoading } = useSWR<OrganizationUnit>(
    () =>
      organizationUnitId && {
        path: `organisational-units/${organizationUnitId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}

export const useOrganizationUnitNamespace = (id?: number) => {
  const { data, mutate, isLoading } = useSWR<Namespace>(
    () =>
      id && {
        path: `organisational-units/${id}/namespace`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
