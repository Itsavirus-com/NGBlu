import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { AuditTrail, AuditTrailResponse } from './models/audit-trail.type'

export const useAuditTrail = (id?: string) => {
  const { data, mutate, isLoading } = useSWR<AuditTrail | AuditTrailResponse>(
    () => {
      if (id) {
        return { path: `audits/${id}` }
      }
      return null
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
