import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Project } from './models/project.type'

export const useProject = (projectId: number) => {
  const { data, mutate, isLoading } = useSWR<Project>(
    {
      path: `projects/${projectId}`,
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
