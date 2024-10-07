import { proxy } from 'valtio'

import { toastModel } from './toast-model'
import { ToastStore } from './toast-store.type'

export const toastStore = proxy<ToastStore>({
  basic: toastModel,
  stacked: [],
})
