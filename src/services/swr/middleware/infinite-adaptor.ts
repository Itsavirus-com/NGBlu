import omit from 'lodash/omit'
import { proxy, snapshot } from 'valtio'

import { mapData } from './collection-mapper'

type InfiniteAdaptorParams<Model> = {
  computeFn?: (state: Model) => Model & any
  collectionName?: string
  keyMapping?: Record<string, any>
  data: any[]
}

export function infiniteAdaptor<Model>({
  data,
  computeFn,
  collectionName = 'data',
  keyMapping,
}: InfiniteAdaptorParams<Model>) {
  const formattedData = data?.reduce(
    (acc: any, cur: any) => {
      const mappedData = mapData(cur, collectionName, keyMapping)

      const collection = mappedData[collectionName].map((item: any) => {
        const state = proxy<any>(item)
        const stateSnapshot = snapshot(state)

        const computed = computeFn ? computeFn(state) : state
        const computedSnapshot = computed ? snapshot(computed) : {}

        return { ...stateSnapshot, ...computedSnapshot }
      })

      acc[collectionName].push(...collection)
      acc = { ...acc, ...omit(mappedData, collectionName) }

      return acc
    },
    Object.assign({}, { [collectionName]: [] })
  )

  return formattedData
}
