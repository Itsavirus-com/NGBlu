'use client'

import clsx from 'clsx'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

import { Option } from '@/utils/format-option.util'

import { SelectLoading } from './select-loading'
import { useSelect } from './select.hook'
import './select.scss'

type SelectProps<OptionValue> = {
  label?: string
  name: string
  filterName?: string
  containerClass?: string
  apiPath?: string
  apiPathSelected?: string
  option: Option
  filter?: Record<string, any>
  onChange?: (value: string | number | null, optionData?: OptionValue | null) => void
  isHidden?: boolean
  isRequired?: boolean
  disabled?: boolean
  isSelectedIdWithParams?: boolean
}

export const ControlledSelect = <OptionValue extends Record<string, any>>(
  props: SelectProps<OptionValue>
) => {
  const {
    label,
    name,
    containerClass,
    apiPath,
    apiPathSelected,
    option,
    filter,
    isHidden,
    isRequired,
    onChange,
    disabled,
    isSelectedIdWithParams,
  } = props

  const {
    options,
    selectedOption,
    isLoading,
    isLoadingInfinity,
    invalid,
    error,
    handleScrollBottom,
    handleChange,
  } = useSelect({
    name,
    apiPath,
    option,
    filter,
    onChange,
    isSelectedIdWithParams,
    apiPathSelected,
  })

  if (isHidden && options.length <= 1) {
    return null
  }

  return (
    <Form.Group className={containerClass}>
      <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>

      {isLoading && !isLoadingInfinity ? (
        <SelectLoading />
      ) : (
        <Select
          value={selectedOption}
          options={options}
          onChange={handleChange}
          onMenuScrollToBottom={handleScrollBottom}
          isLoading={isLoadingInfinity}
          className={clsx('react-select-container', { 'is-invalid': invalid })}
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
