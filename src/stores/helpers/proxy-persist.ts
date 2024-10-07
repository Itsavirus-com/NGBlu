import { proxy, subscribe } from 'valtio'

import { load, save } from '@/utils/storage'

export const proxyWithPersist = <T extends object>(initialState: T, key: string) => {
  const state = proxy<T>(load(key) || initialState)

  subscribe(state, () => {
    save(key, state)
  })

  return state
}
