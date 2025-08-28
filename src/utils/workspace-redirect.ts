import { Workspace } from '@/services/swr/models/workspace.type'

export async function getPostLoginRedirectUrl(workspaces: Workspace[]): Promise<string> {
  // If no workspaces, redirect to login (this shouldn't happen for authenticated users)
  if (!workspaces || workspaces.length === 0) {
    return '/auth/login'
  }

  // If only one workspace, redirect directly to dashboard
  if (workspaces.length === 1) {
    return '/dashboard'
  }

  // If multiple workspaces, redirect to workspace select
  return '/auth/workspace-select'
}
