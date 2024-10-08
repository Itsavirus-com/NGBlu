import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { CompanyStatus } from './models/company-status.type'

export const useCompanyStatus = (companyStatusId?: number) => {
  const { data, mutate, isLoading } = useSWR<CompanyStatus>(
    () =>
      companyStatusId && {
        path: `companies/statuses/${companyStatusId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
