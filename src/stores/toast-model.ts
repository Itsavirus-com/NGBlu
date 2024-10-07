import { proxy } from 'valtio'

import { computeToastModel } from './toast-model.computed'
import { ToastModel } from './toast-model.type'

export const initialToastModel: ToastModel = proxy({
  variant: 'success',
  body: undefined,
  title: undefined,
})

export const toastModel = {
  ...initialToastModel,
  ...computeToastModel(initialToastModel),
}
