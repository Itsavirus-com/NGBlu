import { proxy, snapshot } from 'valtio'

import { computeToastModel } from './toast-model.computed'
import { ToastModel } from './toast-model.type'
import { toastStore } from './toast-store'

export const showBasicToast = (toast: ToastModel) => {
  toastStore.basic = toast
}

export const showStackedToast = (toast: ToastModel) => {
  toastStore.stacked.push({ ...toast, ...computeToastModel(proxy(toast)) })
}

export const cleanStackedToast = () => {
  const { stacked } = snapshot(toastStore)

  toastStore.stacked = stacked.filter(item => item.visible)
}

export const hideStackedToast = (index: number) => {
  toastStore.stacked[index].body = undefined
  toastStore.stacked[index].visible = false
}

export const hideBasicToast = () => {
  toastStore.basic.body = undefined
  toastStore.basic.visible = false
}
