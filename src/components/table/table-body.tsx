import { useState } from 'react'

import { useTableData } from '@/services/swr/use-table-data'

import { TableActions, TableActionsHead } from './table-actions'
import { TableBodyProps } from './table-body.type'
import { TableEmpty } from './table-empty'
import { TableLoading } from './table-loading'
import { TablePagination } from './table-pagination'

export const TableBody = <TableValues extends Record<string, any>>(
  props: TableBodyProps<TableValues>
) => {
  const { columns, apiPath, actions, customActions, actionBasePath, filters } = props
  const hasActions = !!actions?.length || !!customActions?.length

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(20)

  const { data, isLoading, pagination } = useTableData<TableValues>(apiPath, {
    page,
    limit: perPage,
    ...filters,
  })

  if (!columns?.length) return null

  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-row-dashed table-row-gray-400 align-middle gs-0 gy-4">
          <thead>
            <tr className="fw-bold text-gray-500">
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
