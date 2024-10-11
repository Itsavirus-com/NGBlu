import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ProjectType } from './models/project-type'

export const useProjectType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<ProjectType>(
    () =>
      typeId && {
        path: `projects/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
