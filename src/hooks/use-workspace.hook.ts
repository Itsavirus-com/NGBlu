'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useWorkspaceContext } from '@/contexts/WorkspaceContext'
import { Workspace } from '@/services/swr/models/workspace.type'
import { useWorkspaces } from '@/services/swr/use-workspaces'

export const useWorkspace = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { workspaceContextId, setWorkspaceContextId, setCurrentWorkspace } = useWorkspaceContext()
  const { data: workspacesResponse, isLoading, mutate } = useWorkspaces()
  const [needsWorkspaceSelection, setNeedsWorkspaceSelection] = useState(false)

  const workspaces = workspacesResponse || []

  // Check if user needs workspace selection
  useEffect(() => {
    // if session is expired, no workspace selection needed
    if (status !== 'authenticated') {
      setNeedsWorkspaceSelection(false)
      return
    }

    // Check if workspace context is already set
    if (workspaceContextId) {
      // Workspace context already set, no need for selection
      setNeedsWorkspaceSelection(false)
      return
    }

    // Check workspace data when it loads
    if (workspacesResponse) {
      const workspaceData = workspacesResponse

      if (workspaceData.length === 0) {
        // No workspaces available
        setNeedsWorkspaceSelection(false)
        router.push('/auth/login')
      } else if (workspaceData.length === 1) {
        // Only one workspace, auto-select it
        selectWorkspace(workspaceData[0])
        setNeedsWorkspaceSelection(false)
      } else {
        // Multiple workspaces, need selection
        setNeedsWorkspaceSelection(true)
      }
    }
  }, [status, workspaceContextId, workspacesResponse, router])

  const selectWorkspace = async (workspace: Workspace) => {
    try {
      setWorkspaceContextId(workspace.id)
      setCurrentWorkspace(workspace)
      setNeedsWorkspaceSelection(false)
      return true
    } catch (error) {
      console.error('Error selecting workspace:', error)
      return false
    }
  }

  const clearWorkspaceContext = () => {
    setWorkspaceContextId(null)
    setCurrentWorkspace(null)
  }

  const getCurrentWorkspaceContext = () => {
    return workspaceContextId
  }

  return {
    workspaces,
    isLoading,
    needsWorkspaceSelection,
    selectWorkspace,
    clearWorkspaceContext,
    getCurrentWorkspaceContext,
  }
}
