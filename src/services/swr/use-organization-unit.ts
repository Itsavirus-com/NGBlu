import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { OrganizationUnit } from './models/organization-unit.type'

export const useOrganizationUnit = (organizationUnitId: number) => {
  const { data, mutate, isLoading } = useSWR<OrganizationUnit>(
    {
      path: `organisational-units/${organizationUnitId}`,
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
