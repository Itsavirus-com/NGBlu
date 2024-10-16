'use client'

import { useEffect, useRef, useState } from 'react'
import { Form, FormSelectProps, Placeholder } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

import { useOptionData } from '@/services/swr/use-option-data'

type SelectProps<OptionValue> = FormSelectProps & {
  label?: string
  name: string
  containerClass?: string
  apiPath: string
  option: {
    label: (value: OptionValue) => string | number
    value: (value: OptionValue) => string | number
  }
}

export const ControlledSelect = <OptionValue extends Record<string, any>>(
  props: SelectProps<OptionValue>
) => {
  const { label, name, containerClass, children, apiPath, option, ...otherProps } = props

  const { register, control } = useFormContext()
  const {
    fieldState: { invalid, error },
  } = useController({ control, name })

  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [allData, setAllData] = useState<OptionValue[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const selectRef = useRef<HTMLSelectElement>(null)

  const { data, pagination } = useOptionData<OptionValue>(apiPath, {
    page,
    limit: 10,
  })

  useEffect(() => {
    if (data && pagination) {
      setLastPage(pagination.lastPage)
      setAllData(prevData => [...prevData, ...data])
      setIsLoading(false)

      if (selectRef.current) {
        selectRef.current.value = 'select_option'
      }
    }
  }, [data, pagination])

  const handleLoadMore = () => {
    if (page < lastPage && !isLoading) {
      setIsLoading(true)
      setPage(prev => prev + 1)
    }
  }

  return (
    <Form.Group className={containerClass}>
      {label && <Form.Label className="fw-bold">{label}</Form.Label>}
      {allData.length === 0 ? (
        <Placeholder as="div" animation="wave">
          <Placeholder
            size="lg"
            bg="gray-500"
            className="w-100 rounded"
            style={{ height: '43.59px' }}
          />
        </Placeholder>
      ) : (
        <Form.Select
          id={name}
          as="select"
          isInvalid={invalid}
          {...register(name)}
          {...otherProps}
          ref={selectRef}
          autoComplete={name}
          data-test-id={name}
          onChange={e => {
            const value = e.target.value
            if (value === 'load_more') {
              handleLoadMore()
            }
          }}
        >
          <option disabled selected value={'select_option'}>
            Select one
          </option>
          {allData.map((item: OptionValue, index: number) => (
            <option key={index} value={option.value(item)}>
              {option.label(item)}
            </option>
          ))}
          {page < lastPage && (
            <option value="load_more" disabled={isLoading}>
              {isLoading ? 'Loading more...' : 'Load more...'}
            </option>
          )}
        </Form.Select>
      )}

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
