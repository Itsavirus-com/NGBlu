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
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    data,
    pagination,
    isLoading: isLoadingData,
  } = useOptionData<OptionValue>(apiPath, {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleScroll = () => {
    if (!dropdownRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      if (page < lastPage && !isLoading) {
        setIsLoading(true)
        setPage(prev => prev + 1)
      }
    }
  }

  const handleSelect = (value: string | number) => {
    onChange && onChange(value)
    field.onChange(value)
    setIsOpen(false)
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
    <Form.Group className={containerClass} ref={containerRef}>
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
        <div className="position-relative">
          <div
            className={clsx('form-select', { 'is-invalid': invalid })}
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: 'pointer' }}
          >
            {detailData
              ? option.label(detailData)
              : field.value
                ? allData.find(item => String(option.value(item)) === field.value)
                  ? option.label(
                      allData.find(
                        item => String(option.value(item)) === field.value
                      ) as OptionValue
                    )
                  : 'Select one'
                : 'Select one'}
          </div>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="position-absolute w-100 bg-white border rounded mt-1 shadow py-2"
              style={{
                maxHeight: '25rem',
                overflowY: 'auto',
                zIndex: 1000,
              }}
              onScroll={handleScroll}
            >
              {allData.map((item: OptionValue, index: number) => (
                <div
                  key={index}
                  className={clsx('px-3 py-2 cursor-pointer', {
                    'bg-light': String(option.value(item)) === field.value,
                  })}
                  onClick={() => handleSelect(String(option.value(item)))}
                  style={{ cursor: 'pointer' }}
                >
                  {option.label(item)}
                </div>
              ))}
              {isLoading && <div className="text-center py-2 text-muted">Loading more...</div>}
            </div>
          )}
        </div>
      )}

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
