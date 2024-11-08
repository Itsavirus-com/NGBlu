import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRootProject } from './models/enterprise-root-project.type'

export const useEnterpriseRootProject = (enterpriseRoot?: number, projectId?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRootProject>(
    () =>
      enterpriseRoot &&
      projectId && {
        path: `enterprise-roots/${enterpriseRoot}/projects/${projectId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
