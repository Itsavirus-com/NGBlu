import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ProjectInfo } from './models/project-info.type'

export const useProjectInfo = (id?: number) => {
  const { data, mutate, isLoading } = useSWR<ProjectInfo>(
    () =>
      id && {
        path: `projects/infos/${id}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
