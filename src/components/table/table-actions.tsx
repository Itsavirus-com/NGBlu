import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'

import { TableActionsHeadProps, TableActionsProps } from './table-actions.type'

export const TableActionsHead = ({ actions, customActions }: TableActionsHeadProps) => {
  const t = useTranslations('common.table')

  if (!actions?.length && !customActions?.length) return null

  return <th className="min-w-100px text-end">{t('actions')}</th>
}

export const TableActions = (props: TableActionsProps) => {
  const { actions, customActions, actionBasePath, dataId } = props

  if (!actions?.length && !customActions?.length) return null

  return (
    <td>
      <div className="d-flex justify-content-end flex-shrink-0">
        {customActions?.map((customAction, index) => <Button key={index} {...customAction} />)}

        {actions?.includes('view') && (
          <Button
            href={`${actionBasePath}/${dataId}`}
            icon="book"
            colorClass="light"
            activeColorClass="color-primary"
            iconSize="fs-3"
            className="me-1"
          />
        )}

        {actions?.includes('edit') && (
          <Button
            href={`${actionBasePath}/${dataId}/edit`}
            icon="pencil"
            colorClass="light"
            activeColorClass="color-primary"
            iconSize="fs-3"
            className="me-1"
          />
        )}

        {actions?.includes('delete') && (
          <Button icon="trash" colorClass="light" activeColorClass="color-danger" iconSize="fs-3" />
        )}
      </div>
    </td>
  )
}
