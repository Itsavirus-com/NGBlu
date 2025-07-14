import { proxy } from 'valtio'

import { computeLoadingModel } from './loading-model.computed'

// Create the proxy object first
export const loadingModel = proxy({
  loadingStates: [] as any[],
  isLoading: false,
})

// Add the methods to the proxy object
Object.assign(loadingModel, computeLoadingModel(loadingModel))
