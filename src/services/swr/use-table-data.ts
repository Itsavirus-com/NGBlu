import useSWR from 'swr'

import { AnyObject } from './middleware/model-adaptor.type'
import { TableDataCollection, TableDataParams } from './models/table-data.type'

export const useTableData = <TableValues extends AnyObject>(
  path: string,
  params?: TableDataParams
) => {
  const { limit = 20, page = 1, ...otherParams } = params || {}

  const { data, ...results } = useSWR<TableDataCollection<TableValues>>({
    path,
    params: { limit, page, ...otherParams },
  })

  return { ...data, ...results }
}
