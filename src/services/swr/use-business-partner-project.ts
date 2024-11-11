import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartnerProject } from './models/business-partner-project.type'

export const useBusinessPartnerProject = (businessPartnerId: number, projectId?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartnerProject>(
    () =>
      businessPartnerId &&
      projectId && {
        path: `business-partners/${businessPartnerId}/projects/${projectId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
