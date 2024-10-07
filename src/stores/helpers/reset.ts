import cloneDeep from 'lodash/cloneDeep'

const reset = (store: Record<string, any>, defaultValue: Record<string, any>) => {
  const resetObj = cloneDeep(defaultValue)

  Object.keys(resetObj).forEach(key => {
    store[key] = resetObj[key]
  })
}

export default reset
