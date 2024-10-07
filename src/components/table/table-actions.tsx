import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/button/button'
import { useToast } from '@/hooks/use-toast.hook'
import { generalApi } from '@/services/api/general-api'

import { TableActionsHeadProps, TableActionsProps } from './table-actions.type'
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal'

export const TableActionsHead = ({ actions, customActions }: TableActionsHeadProps) => {
  const t = useTranslations('common.table')

  if (!actions?.length && !customActions?.length) return null

  return <th className="text-end">{t('actions')}</th>
}

export const TableActions = (props: TableActionsProps) => {
  const { actions, customActions, actionBasePath, dataId, apiPath, onDelete } = props

  const t = useTranslations('common.table')

  const { showToast } = useToast()
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false)

  const onConfirmDelete = async () => {
    if (!apiPath) return
    try {
      const res = await generalApi.deleteItem(`${apiPath}/${dataId}`)

      if (res.ok) {
        onDelete?.()
        showToast({ variant: 'success', body: t('deleteSuccess') })
      }
    } catch {
      showToast({ variant: 'danger', body: t('deleteError') })
    } finally {
      setDeleteConfirmVisible(false)
    }
  }

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
          <Button
            icon="trash"
            colorClass="light"
            activeColorClass="color-danger"
            iconSize="fs-3"
            onClick={() => setDeleteConfirmVisible(true)}
          />
        )}
      </div>

      <ConfirmationModal
        visible={deleteConfirmVisible}
        onConfirm={onConfirmDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        title={t('deleteConfirmationTitle')}
        body={t('deleteConfirmationDesc')}
        variant="danger"
      />
    </td>
  )
}
