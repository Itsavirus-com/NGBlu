import { useState } from 'react'

import { useTableData } from '@/services/swr/use-table-data'
import { processQueryParams } from '@/utils/queryParams'

import { DynamicTableBodyProps } from './dynamic-table-body.type'
import { TableActions, TableActionsHead } from './TableActions'
import { TableEmpty } from './TableEmpty'
import { TableLoading } from './TableLoading'
import { TablePagination } from './TablePagination'

export const DynamicTableBody = <TableValues extends Record<string, any>>(
  props: DynamicTableBodyProps<TableValues>
) => {
  const {
    columns,
    apiPath,
    actions,
    customActions,
    actionBasePath,
    filters,
    defaultFilters = {},
    queryParams,
    onDelete,
  } = props
  const hasActions = !!actions?.length || !!customActions?.length

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(20)

  // Filter out empty values from filters object
  const filteredFilters = filters
    ? {
        ...filters,
        filter: filters.filter
          ? Object.fromEntries(Object.entries(filters.filter).filter(([_, value]) => value !== ''))
          : {},
      }
    : { filter: {} }

  const { data, isLoading, pagination, mutate } = useTableData<TableValues>(apiPath, {
    page,
    limit: perPage,
    filter: {
      ...defaultFilters,
      ...filteredFilters.filter,
    },
  })

  if (!columns?.length) return null

  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-row-dashed table-row-gray-400 align-middle gs-0 gy-4">
          <thead>
            <tr className="fw-bold">
              {columns.map(column => (
                <th key={column.id} className={column.headClassName}>
                  {column.title}
                </th>
              ))}

              <TableActionsHead actions={actions} customActions={customActions} />
            </tr>
          </thead>

          <tbody>
            {!!data?.length &&
              data?.map((row, index) => (
                <tr key={index}>
                  {columns.map(column => (
                    <td key={column.id} className={column.bodyClassName}>
                      {column.render ? column.render(row) : row[column.id]}
                    </td>
                  ))}

                  <TableActions
                    actions={actions}
                    customActions={customActions}
                    actionBasePath={actionBasePath}
                    dataId={row.id}
                    apiPath={apiPath}
                    onDelete={onDelete}
                    queryParams={processQueryParams(row, queryParams)}
                    rowData={row}
                  />
                </tr>
              ))}

            <TableEmpty
              visible={!data?.length && !isLoading}
              hasActions={hasActions}
              columnLength={columns.length}
            />

            <TableLoading
              visible={!data?.length && isLoading}
              columnLength={columns.length}
              hasActions={hasActions}
            />
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={page}
        totalPage={pagination?.lastPage}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </>
  )
}
