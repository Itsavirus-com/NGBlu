'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'
import Select from 'react-select'

import { useOptionData, useOptionDataById } from '@/services/swr/use-option-data'

type SelectProps<OptionValue> = {
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
  onChange?: (value: string | number | null) => void
  isHidden?: boolean
  isRequired?: boolean
  disabled?: boolean
}

export const ControlledSelect = <OptionValue extends Record<string, any>>(
  props: SelectProps<OptionValue>
) => {
  const {
    label,
    name,
    containerClass,
    apiPath,
    option,
    filter,
    isHidden,
    isRequired,
    onChange,
    disabled,
  } = props

  const { control } = useFormContext()
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name })

  const [page, setPage] = useState<number>(1)
  const [allData, setAllData] = useState<OptionValue[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      if (page === 1) setAllData(data)
      else setAllData(prevData => [...prevData, ...data])
      setIsLoading(false)
    }
  }, [data, pagination])

  useEffect(() => {
    if (isHidden && allData.length === 0) {
      field.onChange(null)
    }
  }, [isHidden, allData.length])

  if (isHidden && allData.length === 0) {
    return null
  }

  const options = [
    { value: 0, label: 'Select one', data: null },
    ...allData.map(item => ({
      value: String(option.value(item)),
      label: `${item.id} | ${option.label(item)}`,
      data: item,
    })),
  ]

  const selectedOption = detailData
    ? { value: String(option.value(detailData)), label: option.label(detailData), data: detailData }
    : field.value
      ? options.find(opt => opt.value === field.value)
      : null

  const handleScrollBottom = () => {
    if (pagination && page < pagination.lastPage && !isLoading) {
      setIsLoading(true)
      setPage(prev => prev + 1)
    }
  }

  return (
    <Form.Group className={containerClass}>
      <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>
      {allData.length === 0 ? (
        <Form.Control disabled placeholder="Loading..." />
      ) : (
        <Select
          value={selectedOption}
          options={options}
          onChange={option => {
            const value = option?.value ?? ''
            field.onChange(value as string)
            onChange?.(value)
          }}
          onMenuScrollToBottom={handleScrollBottom}
          isLoading={isLoading}
          className="react-select-container"
          styles={{
            control: baseStyles => ({
              ...baseStyles,
              borderColor: invalid ? 'var(--bs-form-invalid-border-color)' : baseStyles.borderColor,
              '&:hover': {
                borderColor: invalid
                  ? 'var(--bs-form-invalid-border-color)'
                  : baseStyles.borderColor,
              },
            }),
          }}
          classNamePrefix="react-select"
          placeholder="Select one"
          loadingMessage={() => 'Loading more...'}
          isDisabled={disabled}
        />
      )}
      {invalid && error && <div className="invalid-feedback d-block">{error.message}</div>}
    </Form.Group>
  )
}
