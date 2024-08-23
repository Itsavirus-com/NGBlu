import { useTableData } from '@/services/swr/use-table-data'

import { TableActions, TableActionsHead } from './table-actions'
import { TableBodyProps } from './table-body.type'

export const TableBody = <TableValues extends Record<string, any>>(
  props: TableBodyProps<TableValues>
) => {
  const { columns, apiPath, actions, customActions, actionBasePath } = props
  const { data } = useTableData<TableValues>(apiPath, {})

  if (!columns?.length) return null

  return (
    <div className="table-responsive">
      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
        <thead>
          <tr className="fw-bold text-muted">
            {columns.map(column => (
              <th key={column.id} className={column.headClassName}>
                {column.title}
              </th>
            ))}

            <TableActionsHead actions={actions} customActions={customActions} />
          </tr>
        </thead>

        {!!data?.length && (
          <tbody>
            {data?.map((row, index) => (
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
          </tbody>
        )}
      </table>
    </div>
  )
}
