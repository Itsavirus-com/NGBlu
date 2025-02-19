import { useEffect, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { useOptionData, useOptionDataById } from '@/services/swr/use-option-data'
import { Option, formatSelectedOption } from '@/utils/format-option.util'

interface UseSelectProps<OptionValue> {
  name: string
  apiPath: string
  option: Option
  filter?: Record<string, any>
  onChange?: (value: string | number | null, optionData?: OptionValue | null) => void
  isSelectedIdWithParams?: boolean
}

export const useSelect = <OptionValue extends Record<string, any>>({
  name,
  apiPath,
  option,
  filter,
  onChange,
  isSelectedIdWithParams,
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

  const { data: detailData, isLoading: isLoadingOptionsById } = useOptionDataById<OptionValue>(
    apiPath,
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

  const options = [
    { value: '0', label: 'Select one', data: null },
    ...allData.map(item => ({
      value: String(option.value(item)),
      label: `${item.id} | ${option.label(item)}`,
      data: item,
    })),
  ]

  const selectedOption = formatSelectedOption(detailData, field.value, option, options)

  const handleScrollBottom = () => {
    if (pagination && page < pagination.lastPage && !isLoadingInfinity) {
      setIsLoadingInfinity(true)
      setPage(prev => prev + 1)
    }
  }

  const handleChange = (option: any) => {
    const value = option?.value ?? ''
    field.onChange(value as string)
    onChange?.(value, option?.data ?? null)
  }

  return {
    options,
    selectedOption,
    isLoading: isLoadingOptions || isLoadingOptionsById,
    isLoadingInfinity,
    invalid,
    error,
    handleScrollBottom,
    handleChange,
  }
}
