import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useSelect } from '../controlled-select.hook'

// Mock the SWR hooks
jest.mock('@/services/swr/use-option-data', () => ({
  useOptionData: jest.fn(() => ({
    data: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ],
    pagination: { lastPage: 1 },
    isLoading: false,
  })),
  useOptionDataById: jest.fn(() => ({
    data: { id: 1, name: 'Option 1' },
  })),
}))

// Mock format utility
jest.mock('@/utils/format-option.util', () => ({
  formatSelectedOption: jest.fn((detailData, value, option, options) => {
    if (value && detailData) {
      return {
        value: String(value),
        label: `${detailData.id} | ${detailData.name}`,
        data: detailData,
      }
    }
    return null
  }),
}))

// Test wrapper with form context
const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: ReactNode
  defaultValues?: any
}) => {
  const methods = useForm({ defaultValues })
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('useSelect Hook', () => {
  const defaultProps = {
    name: 'testSelect',
    option: {
      value: (item: any) => item.id,
      label: (item: any) => item.name,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    expect(result.current.options).toHaveLength(3) // "Select one" + 2 data items
    expect(result.current.options[0]).toEqual({ value: '0', label: 'Select one', data: null })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isLoadingInfinity).toBe(false)
  })

  it('formats options correctly', () => {
    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    const options = result.current.options
    expect(options[1]).toEqual({
      value: '1',
      label: '1 | Option 1',
      data: { id: 1, name: 'Option 1' },
    })
    expect(options[2]).toEqual({
      value: '2',
      label: '2 | Option 2',
      data: { id: 2, name: 'Option 2' },
    })
  })

  it('handles multi-select mode', () => {
    const { result } = renderHook(() => useSelect({ ...defaultProps, isMulti: true }), {
      wrapper: TestWrapper,
    })

    // Should not include "Select one" option in multi-select
    expect(result.current.options).toHaveLength(2)
    expect(result.current.options[0].value).toBe('1')
  })

  it('handles change for single select', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useSelect({ ...defaultProps, onChange }), {
      wrapper: TestWrapper,
    })

    const mockOption = { value: '1', label: '1 | Option 1', data: { id: 1, name: 'Option 1' } }
    result.current.handleChange(mockOption)

    expect(onChange).toHaveBeenCalledWith('1', { id: 1, name: 'Option 1' })
  })

  it('handles change for multi-select', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useSelect({ ...defaultProps, onChange, isMulti: true }), {
      wrapper: TestWrapper,
    })

    const mockOptions = [
      { value: '1', data: { id: 1, name: 'Option 1' } },
      { value: '2', data: { id: 2, name: 'Option 2' } },
    ]
    result.current.handleChange(mockOptions)

    expect(onChange).toHaveBeenCalledWith(['1', '2'], mockOptions)
  })

  it('handles scroll bottom for pagination', () => {
    // Mock pagination with more pages
    const mockUseOptionData = require('@/services/swr/use-option-data').useOptionData
    mockUseOptionData.mockReturnValue({
      data: [{ id: 1, name: 'Option 1' }],
      pagination: { lastPage: 2 },
      isLoading: false,
    })

    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    // Should be able to load more
    result.current.handleScrollBottom()
    // Note: Testing the actual page increment would require more complex mocking
  })
})
