'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { KTIcon } from '@/components/kt-icon/KtIcon'
import { Workspace } from '@/services/swr/models/workspace.type'

export interface WorkspaceSelectorProps {
  workspaces: Workspace[]
  selectedWorkspaceId: string
  onWorkspaceSelect: (workspaceId: string) => void
  onContinue: () => void
  isLoading?: boolean
}

export function WorkspaceSelector({
  workspaces,
  selectedWorkspaceId,
  onWorkspaceSelect,
  onContinue,
  isLoading,
}: WorkspaceSelectorProps) {
  const t = useTranslations('workspace')

  return (
    <div className="d-flex flex-column flex-root" id="kt_app_root">
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-center text-center p-10">
          <div className="card w-lg-500px bg-body rounded shadow-sm py-8 px-8 mx-auto">
            <div className="card-body py-4">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-gray-800 fs-2x fw-bolder mb-3">{t('selectWorkspace')}</h1>
                <div className="text-gray-500 fw-semibold fs-6">
                  {t('selectWorkspaceDescription')}
                </div>
              </div>

              {/* Workspace Options */}
              <div className="d-flex flex-column gap-4 mb-8">
                {workspaces.map(workspace => (
                  <div
                    key={workspace.id}
                    className={`card border-2 cursor-pointer transition-all ${
                      selectedWorkspaceId === workspace.id
                        ? 'border-primary bg-light-primary'
                        : 'border-light hover-border-primary'
                    }`}
                    onClick={() => onWorkspaceSelect(workspace.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body p-6">
                      <div className="d-flex align-items-center">
                        <div className="form-check me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="workspace"
                            id={workspace.id}
                            checked={selectedWorkspaceId === workspace.id}
                            onChange={() => onWorkspaceSelect(workspace.id)}
                          />
                        </div>
                        <div className="text-start flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <KTIcon iconName="office-bag" className="fs-2x text-primary me-3" />
                            <h6 className="mb-0 fw-bold text-gray-800">{workspace.name}</h6>
                          </div>
                          <small className="text-muted fs-7 ">
                            {workspace.type.replace('-', ' ').toUpperCase()}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Button */}
              <Button
                onClick={onContinue}
                disabled={!selectedWorkspaceId || isLoading}
                loading={isLoading}
                label={t('continue')}
                className="w-100 btn-primary"
                size="lg"
                colorClass="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
