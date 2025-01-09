'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Form, FormSelectProps, Placeholder } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

import { useOptionData, useOptionDataById } from '@/services/swr/use-option-data'

type SelectProps<OptionValue> = FormSelectProps & {
  label?: string
  name: string
  filterName?: string
  containerClass?: string
  apiPath: string
  option: {
    label: (value: OptionValue) => string | number
    value: (value: OptionValue) => string | number
  }
  filter?: Record<string, any>
  onChange?: (value: string | number) => void
  isHidden?: boolean
  isRequired?: boolean
}

export const ControlledSelect = <OptionValue extends Record<string, any>>(
  props: SelectProps<OptionValue>
) => {
  const {
    label,
    name,
    filterName,
    containerClass,
    children,
    apiPath,
    option,
    filter,
    isHidden,
    isRequired,
    onChange,
    ...otherProps
  } = props

  const { control } = useFormContext()
  const {
    field,
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
    filter: {
      ...filter,
    },
  })

  const { data: detailData } = useOptionDataById<OptionValue>(apiPath, field.value)

  useEffect(() => {
    if (data && pagination) {
      setLastPage(pagination.lastPage)
      if (page === 1) setAllData(data)
      else setAllData(prevData => [...prevData, ...data])
      setIsLoading(false)
    }
  }, [data, pagination])

  const handleLoadMore = () => {
    if (page < lastPage && !isLoading) {
      setIsLoading(true)
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (isHidden && allData.length === 0) {
      field.onChange(null)
    }
  }, [isHidden, allData.length])

  if (isHidden && allData.length === 0) {
    return null
  }

  return (
    <Form.Group className={containerClass}>
      <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>
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
          isInvalid={invalid}
          {...field}
          {...otherProps}
          ref={selectRef}
          value={field.value || 'select_option'}
          autoComplete={name}
          data-test-id={name}
          onChange={e => {
            onChange && onChange(e.target.value)
            field.onChange(e.target.value)
            const value = e.target.value
            if (value === 'load_more') {
              field.onChange(field.value || 'select_option')
              handleLoadMore()
            }
          }}
        >
          {detailData ? (
            <option value={option.value(detailData)}>{option.label(detailData)}</option>
          ) : (
            <option disabled value={'select_option'}>
              {isLoading ? 'Loading more...' : 'Select one'}
            </option>
          )}
          {allData.map((item: OptionValue, index: number) => (
            <option key={index} value={String(option.value(item))}>
              {option.label(item)}
            </option>
          ))}
          {page < lastPage && (
            <option value="load_more" disabled={isLoading}>
              Load more...
            </option>
          )}
        </Form.Select>
      )}

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
