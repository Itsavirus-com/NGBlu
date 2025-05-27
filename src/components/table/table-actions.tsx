import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { Button } from '@/components/button/Button'
import { ButtonProps } from '@/components/button/button.type'
import { useToast } from '@/hooks/use-toast.hook'
import { generalApi } from '@/services/api/general-api'

import { TableActionsHeadProps, TableActionsProps } from './table-actions.type'
import { ConfirmationModal } from '../confirmation-modal/ConfirmationModal'

export const TableActionsHead = ({ actions, customActions }: TableActionsHeadProps) => {
  const t = useTranslations('common.table')

  if (!actions?.length && !customActions?.length) return null

  return <th className="text-end">{t('actions')}</th>
}

export const TableActions = (props: TableActionsProps) => {
  const {
    actions,
    customActions,
    actionBasePath,
    dataId,
    apiPath,
    onDelete,
    queryParams,
    rowData,
  } = props

  const t = useTranslations('common.table')

  const { showToast } = useToast()
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const onConfirmDelete = async () => {
    if (!apiPath) return
    setLoadingDelete(true)

    try {
      const res = await generalApi.deleteItem(`${apiPath}/${dataId}`)

      if (res.ok) {
        onDelete?.()
        showToast({ variant: 'success', body: t('deleteSuccess') })
      }
    } catch (error: any) {
      const errorMessage = error.message

      showToast({ variant: 'danger', body: errorMessage ? errorMessage : t('deleteError') })
    } finally {
      setDeleteConfirmVisible(false)
      setLoadingDelete(false)
    }
  }

  // Get the appropriate custom actions
  const getCustomActions = (): ButtonProps[] => {
    if (!customActions) return []
    if (typeof customActions === 'function') {
      return customActions(rowData)
    }
    return customActions
  }

  const customActionsList = getCustomActions()
  if (!actions?.length && !customActionsList.length) return null

  return (
    <td>
      <div className="d-flex justify-content-end flex-shrink-0">
        {actions?.includes('view') && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="view-tooltip">{t('viewDetails')}</Tooltip>}
          >
            <span>
              <Button
                href={`${actionBasePath ? `${actionBasePath}/${dataId}` : dataId}${
                  queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ''
                }`}
                icon="book"
                colorClass="light"
                activeColorClass="color-primary"
                iconSize="fs-3"
                className="me-1"
              />
            </span>
          </OverlayTrigger>
        )}

        {actions?.includes('edit') && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="edit-tooltip">{t('edit')}</Tooltip>}
          >
            <span>
              <Button
                href={`${actionBasePath}/${dataId}/edit${
                  queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ''
                }`}
                icon="pencil"
                colorClass="light"
                activeColorClass="color-primary"
                iconSize="fs-3"
                className="me-1"
              />
            </span>
          </OverlayTrigger>
        )}

        {actions?.includes('delete') && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="delete-tooltip">{t('delete')}</Tooltip>}
          >
            <span>
              <Button
                icon="trash"
                colorClass="light"
                activeColorClass="color-danger"
                iconSize="fs-3"
                className="me-1"
                onClick={() => setDeleteConfirmVisible(true)}
              />
            </span>
          </OverlayTrigger>
        )}

        {customActionsList.map((customAction, index) => {
          const tooltipText = customAction.extraProps?.tooltip as string
          return tooltipText ? (
            <OverlayTrigger
              key={index}
              placement="top"
              overlay={<Tooltip id={`custom-tooltip-${index}`}>{tooltipText}</Tooltip>}
            >
              <span>
                <Button {...customAction} />
              </span>
            </OverlayTrigger>
          ) : (
            <Button key={index} {...customAction} />
          )
        })}
      </div>

      <ConfirmationModal
        visible={deleteConfirmVisible}
        onConfirm={onConfirmDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        title={t('deleteConfirmationTitle')}
        body={t('deleteConfirmationDesc')}
        variant="danger"
        isLoading={loadingDelete}
      />
    </td>
  )
}
