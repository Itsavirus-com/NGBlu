import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Company } from './models/company.type'

export const useCompany = (companyId?: number) => {
  const { data, mutate, isLoading } = useSWR<Company>(
    () =>
      companyId && {
        path: `companies/infos/${companyId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
