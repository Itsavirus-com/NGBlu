import { proxy, snapshot } from 'valtio'

import { computeToastModel } from './toast-model.computed'
import { ToastModel } from './toast-model.type'
import { toastStore } from './toast-store'

// Track error counts for deduplication
// This prevents multiple identical error toasts from appearing when multiple API calls fail simultaneously
const errorCounts = new Map<string, number>()

export const showBasicToast = (toast: ToastModel) => {
  toastStore.basic = toast
}

export const showStackedToast = (toast: ToastModel) => {
  // Only apply deduplication for GET request errors (fetching data errors)
  const isGetRequestError =
    toast.body &&
    (toast.body.includes('fetching data') ||
      toast.body.includes('retrieving data') ||
      toast.body.includes('fetch data'))

  if (!isGetRequestError) {
    // For non-GET errors, show toast immediately without deduplication
    toastStore.stacked.push({ ...toast, ...computeToastModel(proxy(toast)) })
    return
  }

  // Create a unique key for this type of error
  const errorKey = `${toast.title}:${toast.body}:${toast.variant}`

  // Check if an identical toast already exists
  const { stacked } = snapshot(toastStore)
  const existingToastIndex = stacked.findIndex(
    item =>
      item.title === toast.title &&
      item.body === toast.body &&
      item.variant === toast.variant &&
      item.visible
  )

  if (existingToastIndex !== -1) {
    // Increment error count for this type
    const currentCount = errorCounts.get(errorKey) || 1
    errorCounts.set(errorKey, currentCount + 1)

    // Update the existing toast with count information
    const existingToast = stacked[existingToastIndex]
    if (currentCount + 1 > 1) {
      toastStore.stacked[existingToastIndex] = {
        ...existingToast,
        body: `${existingToast.body} (${currentCount + 1} errors)`,
      }
    }
  } else {
    // Reset count for new error type
    errorCounts.set(errorKey, 1)

    // Add new toast
    toastStore.stacked.push({ ...toast, ...computeToastModel(proxy(toast)) })
  }
}

export const cleanStackedToast = () => {
  const { stacked } = snapshot(toastStore)

  toastStore.stacked = stacked.filter(item => item.visible)
}

export const hideStackedToast = (index: number) => {
  const toast = toastStore.stacked[index]
  const errorKey = `${toast.title}:${toast.body}:${toast.variant}`

  // Reset error count when toast is dismissed
  errorCounts.delete(errorKey)

  toastStore.stacked[index].body = undefined
  toastStore.stacked[index].visible = false
}

export const hideBasicToast = () => {
  toastStore.basic.body = undefined
  toastStore.basic.visible = false
}

export const clearAllStackedToasts = () => {
  // Clear all stacked toasts
  toastStore.stacked = []

  // Reset all error counts
  errorCounts.clear()
}
