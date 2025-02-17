'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'
import Select from 'react-select'

import { useOptionData, useOptionDataById } from '@/services/swr/use-option-data'

import { SelectLoading } from './select-loading'

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
  onChange?: (value: string | number | null, optionData?: OptionValue | null) => void
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
  const [isLoadingInfinity, setIsLoadingInfinity] = useState<boolean>(false)

  const {
    data,
    pagination,
    isLoading: isLoadingOptions,
  } = useOptionData<OptionValue>(apiPath, {
    page,
    limit: 10,
    filter: {
      ...filter,
    },
  })

  const { data: detailData, isLoading: isLoadingOptionsById } = useOptionDataById<OptionValue>(
    apiPath,
    field.value
  )

  useEffect(() => {
    if (data && pagination) {
      if (page === 1) setAllData(data)
      else setAllData(prevData => [...prevData, ...data])
      setIsLoadingInfinity(false)
    }
  }, [data, pagination])

  const options = [
    { value: 0, label: 'Select one', data: null },
    ...allData.map(item => ({
      value: String(option.value(item)),
      label: `${item.id} | ${option.label(item)}`,
      data: item,
    })),
  ]

  const selectedOption = detailData
    ? {
        value: String(option.value(detailData)),
        label: `${detailData.id} | ${option.label(detailData)}`,
        data: detailData,
      }
    : field.value
      ? options.find(opt => opt.value === field.value)
      : null

  const handleScrollBottom = () => {
    if (pagination && page < pagination.lastPage && !isLoadingInfinity) {
      setIsLoadingInfinity(true)
      setPage(prev => prev + 1)
    }
  }

  if (isHidden && allData.length === 0) {
    return null
  }

  return (
    <Form.Group className={containerClass}>
      <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>

      {isLoadingOptions && !isLoadingInfinity ? (
        <SelectLoading />
      ) : (
        <Select
          value={selectedOption}
          options={options}
          onChange={option => {
            const value = option?.value ?? ''
            field.onChange(value as string)
            onChange?.(value, option?.data ?? null)
          }}
          onMenuScrollToBottom={handleScrollBottom}
          isLoading={isLoadingInfinity}
          className="react-select-container"
          styles={{
            control: baseStyles => ({
              ...baseStyles,
              backgroundColor: 'var(--bs-body-bg)',
              borderColor: invalid
                ? 'var(--bs-form-invalid-border-color)'
                : 'var(--bs-border-color)',
              color: 'var(--bs-body-color)',
              '&:hover': {
                borderColor: invalid
                  ? 'var(--bs-form-invalid-border-color)'
                  : 'var(--bs-border-color)',
              },
            }),
            menu: baseStyles => ({
              ...baseStyles,
              backgroundColor: 'var(--bs-body-bg)',
              color: 'var(--bs-body-color)',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused
                ? 'var(--bs-primary)'
                : state.isSelected
                  ? 'var(--bs-primary-rgb)'
                  : 'var(--bs-body-bg)',
              color: state.isFocused ? 'white' : 'var(--bs-body-color)',
              ':active': {
                backgroundColor: 'var(--bs-primary)',
                color: 'white',
              },
            }),
            singleValue: baseStyles => ({
              ...baseStyles,
              color: 'var(--bs-body-color)',
            }),
            input: baseStyles => ({
              ...baseStyles,
              color: 'var(--bs-body-color)',
            }),
            placeholder: baseStyles => ({
              ...baseStyles,
              color: 'var(--bs-gray-600)',
            }),
            loadingMessage: baseStyles => ({
              ...baseStyles,
              color: 'var(--bs-body-color)',
            }),
            noOptionsMessage: baseStyles => ({
              ...baseStyles,
              color: 'var(--bs-body-color)',
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
