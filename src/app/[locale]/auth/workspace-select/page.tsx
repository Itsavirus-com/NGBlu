'use client'

import { WorkspaceSelector } from './_components/workspace-selector'
import { useWorkspaceSelector } from './_hooks/workspace-selector.hook'

export default function WorkspaceSelectPage() {
  const { workspaces, selectedWorkspaceId, isLoading, handleWorkspaceSelect, handleContinue } =
    useWorkspaceSelector()

  return (
    <WorkspaceSelector
      workspaces={workspaces}
      selectedWorkspaceId={selectedWorkspaceId}
      onWorkspaceSelect={handleWorkspaceSelect}
      onContinue={handleContinue}
      isLoading={isLoading}
    />
  )
}
