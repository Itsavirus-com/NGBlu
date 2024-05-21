import camelCase from 'lodash/camelCase'
import { UseFormReturn } from 'react-hook-form'

import { delay } from '@/utils/delay'

type ParseApiErrorParams = {
  error: Array<{ field: string; message: string }>
  methods: UseFormReturn<any, any>
  keysMapping?: Record<string, string>
}

const createErrorKey = (key: string, keysMapping: Record<string, string>) => {
  const mappingKeys = Object.keys(keysMapping)
  const keyIncluded = mappingKeys.filter(item => key.startsWith(item))

  let errorKey = key

  if (keyIncluded.length) {
    errorKey = key
      .replace(keyIncluded[0], keysMapping[keyIncluded[0]])
      .replace(/^(\.)/, '')
      .replace(/(\.)$/, '')
  }

  return errorKey
}

const scrollToFirstErrorField = async () => {
  await delay(150)
  document.getElementsByClassName('invalid-feedback')[0]?.scrollIntoView(false)
}

export const parseApiErrors = (params: ParseApiErrorParams) => {
  const { error, methods, keysMapping = {} } = params

  if (!error.length) return

  error.forEach(({ field, message }) => {
    const errorKey = createErrorKey(field, keysMapping)

    methods.setError(camelCase(errorKey), { message, type: 'custom' }, { shouldFocus: false })
  })

  scrollToFirstErrorField()
}
