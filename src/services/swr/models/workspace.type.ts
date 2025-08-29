export interface Workspace {
  id: string
  type: string
  name: string
  entities: {
    enterpriserootId: number | null
    businessPartnerId: number | null
    endClientId: null
  }
}

export interface WorkspacesResponse {
  success: boolean
  message: string | null
  data: Workspace[]
}
