'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Workspace } from '@/services/swr/models/workspace.type'

interface WorkspaceContextType {
  currentWorkspace: Workspace | null
  setCurrentWorkspace: (workspace: Workspace | null) => void
  workspaceContextId: string | null
  setWorkspaceContextId: (id: string | null) => void
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const [workspaceContextId, setWorkspaceContextId] = useState<string | null>(null)

  // Load workspace context from session storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedContextId = sessionStorage.getItem('workspaceContext')
      if (storedContextId) {
        setWorkspaceContextId(storedContextId)
      }
    }
  }, [])

  const value: WorkspaceContextType = {
    currentWorkspace,
    setCurrentWorkspace,
    workspaceContextId,
    setWorkspaceContextId: (id: string | null) => {
      setWorkspaceContextId(id)
      if (id) {
        sessionStorage.setItem('workspaceContext', id)
        console.log('Workspace context set:', id)
      } else {
        sessionStorage.removeItem('workspaceContext')
        console.log('Workspace context removed')
      }
    },
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspaceContext() {
  const context = useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error('useWorkspaceContext must be used within a WorkspaceProvider')
  }
  return context
}
