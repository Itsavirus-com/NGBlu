import { LoadingModel, LoadingState } from './loading-model.type'

export function computeLoadingModel(model: LoadingModel) {
  return {
    startLoading: (id: string, message?: string) => {
      const existingIndex = model.loadingStates.findIndex(state => state.id === id)

      const newState: LoadingState = {
        id,
        message,
        timestamp: Date.now(),
      }

      if (existingIndex >= 0) {
        model.loadingStates[existingIndex] = newState
      } else {
        model.loadingStates.push(newState)
      }

      model.isLoading = true
    },

    stopLoading: (id: string) => {
      model.loadingStates = model.loadingStates.filter(state => state.id !== id)
      model.isLoading = model.loadingStates.length > 0
    },

    updateProgress: (id: string, progress: number) => {
      const existingState = model.loadingStates.find(state => state.id === id)
      if (existingState) {
        existingState.progress = progress
      }
    },

    getLoadingState: (id: string) => {
      return model.loadingStates.find(state => state.id === id)
    },

    isLoadingById: (id: string) => {
      return model.loadingStates.some(state => state.id === id)
    },
  }
}
