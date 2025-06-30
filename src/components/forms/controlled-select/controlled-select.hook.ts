import { useEffect, useMemo, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { useOptionData, useOptionDataById } from '@/services/swr/use-option-data'
import { Option, formatSelectedOption } from '@/utils/format-option.util'

interface UseSelectProps<OptionValue> {
  name: string
  apiPath?: string
  apiPathSelected?: string
  option: Option
  filter?: Record<string, any>
  onChange?: (value: string | number | null, optionData?: OptionValue | null) => void
  isSelectedIdWithParams?: boolean
  haveDetailOptions?: boolean
  isMulti?: boolean
}

export const useSelect = <OptionValue extends Record<string, any>>({
  name,
  apiPath = '',
  apiPathSelected,
  option,
  filter,
  onChange,
  isSelectedIdWithParams,
  haveDetailOptions = true,
  isMulti = false,
}: UseSelectProps<OptionValue>) => {
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

  const { data: detailData } = useOptionDataById<OptionValue>(
    haveDetailOptions ? (apiPathSelected ? apiPathSelected : apiPath) : undefined,
    field.value,
    isSelectedIdWithParams,
    { ...filter, id: field.value }
  )

  useEffect(() => {
    if (data) {
      if (page === 1) setAllData(data)
      else setAllData(prevData => [...prevData, ...data])
      setIsLoadingInfinity(false)
    }
  }, [data, page])

  const options = useMemo(
    () => [
      ...(isMulti ? [] : [{ value: '0', label: 'Select one', data: null }]),
      ...(allData?.length
        ? allData.map((item, index) => ({
            value: String(option.value(item)),
            label: `${item.id ? item.id : index + 1} | ${option.label(item)}`,
            data: item,
          }))
        : []),
    ],
    [allData, option, isMulti]
  )

  const selectedOption = useMemo(
    () => formatSelectedOption(detailData, field.value, option, options),
    [detailData, field.value, option, options]
  )

  const handleScrollBottom = () => {
    if (pagination && page < pagination.lastPage && !isLoadingInfinity) {
      setIsLoadingInfinity(true)
      setPage(prev => prev + 1)
    }
  }

  const handleChange = (option: any) => {
    if (isMulti) {
      // Handle multi-select
      const values = option ? option.map((opt: any) => opt.value) : []
      field.onChange(values)
      onChange?.(values, option)
    } else {
      // Handle single select
      const value = option?.value ?? ''
      field.onChange(value as string)
      onChange?.(value, option?.data ?? null)
    }
  }

  return {
    options,
    selectedOption,
    isLoading: isLoadingOptions,
    isLoadingInfinity,
    invalid,
    error,
    handleScrollBottom,
    handleChange,
  }
}
