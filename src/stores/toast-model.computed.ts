import { derive } from 'valtio/utils'

import { ToastModel } from './toast-model.type'

export const computeToastModel = (state: ToastModel) =>
  derive({
    visible: get => !!get(state).body,
    displayTitle: get => get(state).title || '',
    icon: get => {
      switch (get(state).variant) {
        case 'warning':
          return 'information'
        case 'danger':
          return 'cross-circle'
        case 'info':
          return 'information-3'
        case 'success':
        default:
          return 'verify'
      }
    },
  })
