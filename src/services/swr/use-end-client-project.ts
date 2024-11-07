import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClientProject } from './models/end-client-project.type'

export const useEndClientProject = (endClientId?: number, projectId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClientProject>(
    () =>
      endClientId &&
      projectId && {
        path: `end-clients/${endClientId}/projects/${projectId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
