export interface LoadingState {
  id: string
  message?: string
  progress?: number
  timestamp: number
}

export interface LoadingModel {
  loadingStates: LoadingState[]
  isLoading: boolean
}
