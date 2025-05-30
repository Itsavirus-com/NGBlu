import clsx from 'clsx'
import { useState } from 'react'

import { Button } from '@/components/button/Button'

import { DynamicTableBody } from './dynamic-table-body'
import { Filter } from './filter'
import { StaticTableBody } from './static-table-body'
import { TableProps } from './table.type'

export const Table = <TableValues extends Record<string, any>>(props: TableProps<TableValues>) => {
  const {
    title,
    description,
    toolbars,
    filters: filterComponents,
    defaultFilters,
    columns,
    apiPath,
    data,
    actions,
    actionBasePath,
    className,
    queryParams,
    customActions,
    onDelete,
    showDeleteConfirmation,
    noPadding,
  } = props

  const [filters, setFilters] = useState<Record<string, any>>({})

  return (
    <div
      className={clsx(
        {
          'app-container container-fluid': !noPadding,
        },
        className
      )}
    >
      <div className="card card-xxl-stretch">
        <div
          className={clsx('card-header border-0', {
            'pt-5': title || filterComponents,
          })}
        >
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{title}</span>
            {description && <span className="text-muted fw-semibold fs-7">{description}</span>}
          </h3>

          <div className="card-toolbar">
            {toolbars?.map((toolbar, index) => <Button key={index} {...toolbar} />)}

            <Filter onFilter={setFilters}>{filterComponents}</Filter>
          </div>
        </div>
        <div className="card-body py-3">
          {!!data && (
            <StaticTableBody<TableValues>
              columns={columns}
              data={data}
              actions={actions}
              actionBasePath={actionBasePath}
              queryParams={queryParams}
              customActions={customActions}
              onDelete={onDelete}
              showDeleteConfirmation={showDeleteConfirmation}
            />
          )}

          {!!apiPath && (
            <DynamicTableBody<TableValues>
              columns={columns}
              apiPath={apiPath}
              actions={actions}
              actionBasePath={actionBasePath}
              filters={filters}
              defaultFilters={defaultFilters}
              queryParams={queryParams}
              customActions={customActions}
            />
          )}
        </div>
      </div>
    </div>
  )
}
