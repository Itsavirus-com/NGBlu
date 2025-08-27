import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Workspace } from './models/workspace.type'

export const useWorkspaces = () => {
  const { status } = useSession()

  const swrKey =
    status === 'authenticated'
      ? {
          path: 'workspaces/available',
        }
      : null

  const { data, mutate, isLoading } = useSWR<Workspace[]>(
    {
      path: 'workspaces/available',
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
