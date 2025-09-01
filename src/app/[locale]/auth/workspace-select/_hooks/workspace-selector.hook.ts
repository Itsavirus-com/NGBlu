import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useWorkspaceContext } from '@/contexts/WorkspaceContext'
import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { workspaceApi } from '@/services/api/workspace-api'
import { Workspace } from '@/services/swr/models/workspace.type'

export const useWorkspaceSelector = () => {
  const router = useRouter()
  const { showToast } = useToast()
  const { setWorkspace } = useWorkspaceContext()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  // Component state
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch workspaces on mount
  useEffect(() => {
    fetchWorkspaces()
  }, [])

  const fetchWorkspaces = async () => {
    return withLoading(async () => {
      try {
        const response = await workspaceApi.getAvailable()

        if (response.ok && response.data) {
          const workspaceData = response.data.data || response.data
          setWorkspaces(workspaceData)

          // If user has only one workspace, auto-select it and redirect to dashboard
          if (workspaceData.length === 1) {
            const singleWorkspace = workspaceData[0]
            setSelectedWorkspaceId(singleWorkspace.id)

            // Set workspace context locally (no API call needed)
            setWorkspace(singleWorkspace)

            // Redirect to dashboard
            router.push('/dashboard')
            return
          }

          // If user has no workspaces, redirect to login
          if (workspaceData.length === 0) {
            showToast({
              variant: 'danger',
              title: 'No Workspaces',
              body: 'You have no available workspaces.',
            })
            router.push('/auth/login')
          }
        } else {
          throw new Error(response.problem || 'Failed to fetch workspaces')
        }
      } catch (error: any) {
        console.error('Error fetching workspaces:', error)
        showToast({
          variant: 'danger',
          title: 'Error',
          body: error.message || 'Failed to load workspaces',
        })
      } finally {
        setIsLoading(false)
      }
    })
  }

  const handleWorkspaceSelect = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId)
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const handleContinue = async () => {
    if (!selectedWorkspaceId) return

    return withLoading(async () => {
      try {
        // Find the selected workspace
        const selectedWorkspace = workspaces.find(w => w.id === selectedWorkspaceId)
        if (selectedWorkspace) {
          // Set workspace context locally (no API call needed)
          setWorkspace(selectedWorkspace)

          showToast({
            variant: 'success',
            title: 'Workspace Selected',
            body: `Successfully selected ${selectedWorkspace.name}`,
          })

          // Redirect to dashboard
          router.push('/dashboard')
        }
      } catch (error: any) {
        console.error('Error setting workspace context:', error)
        showToast({
          variant: 'danger',
          title: 'Error',
          body: error.message || 'An error occurred',
        })
      }
    })
  }

  return {
    workspaces,
    selectedWorkspaceId,
    isLoading: isSubmitting || isLoading,
    handleWorkspaceSelect,
    handleContinue,
  }
}
