'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { useWorkspaceContext } from '@/contexts/WorkspaceContext'
import { useToast } from '@/hooks/use-toast.hook'
import { Workspace } from '@/services/swr/models/workspace.type'
import { useWorkspaces } from '@/services/swr/use-workspaces'

import { WorkspaceSelector } from './_components/workspace-selector'

export default function WorkspaceSelectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('workspace')
  const { showToast } = useToast()
  const { setWorkspaceContextId, setCurrentWorkspace } = useWorkspaceContext()
  const { data: workspacesResponse, isLoading, mutate } = useWorkspaces()

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Let SessionChecker handle unauthenticated redirects

  // Handle workspace data when it loads
  useEffect(() => {
    if (status !== 'authenticated' || !workspacesResponse) return

    const workspaceData = workspacesResponse

    // If user has only one workspace, auto-select it and redirect to dashboard
    if (workspaceData.length === 1) {
      handleWorkspaceSelect(workspaceData[0])
      return
    }

    // If user has no workspaces, redirect to login
    if (workspaceData.length === 0) {
      showToast({
        variant: 'danger',
        title: t('noWorkspaces'),
        body: t('noWorkspacesMessage'),
      })
      router.push('/auth/login')
    }
  }, [status, workspacesResponse, router, showToast, t])

  const handleWorkspaceSelect = async (workspace: Workspace) => {
    setIsSubmitting(true)
    try {
      // Set workspace context locally (no API call needed)
      setWorkspaceContextId(workspace.id)
      setCurrentWorkspace(workspace)

      showToast({
        variant: 'success',
        title: t('workspaceSelected'),
        body: t('workspaceSelectedMessage', { workspace: workspace.name }),
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Error setting workspace context:', error)
      showToast({
        variant: 'danger',
        title: t('error'),
        body: error.message || t('errorMessage'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <WorkspaceSelector
      workspaces={workspacesResponse || []}
      onWorkspaceSelect={handleWorkspaceSelect}
      isLoading={isSubmitting || isLoading}
    />
  )
}
