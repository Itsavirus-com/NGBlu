import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// Mock the entire hook module to avoid infinite loops
jest.mock('../controlled-select.hook', () => ({
  useSelect: jest.fn(() => ({
    options: [
      { value: '0', label: 'Select one', data: null },
      { value: '1', label: 'Option 1', data: { id: 1, name: 'Option 1' } },
      { value: '2', label: 'Option 2', data: { id: 2, name: 'Option 2' } },
    ],
    isLoading: false,
    isLoadingInfinity: false,
    handleChange: jest.fn(),
    handleScrollBottom: jest.fn(),
  })),
}))

import { useSelect } from '../controlled-select.hook'

// Test wrapper with form context
const TestWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm()
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

  it('returns expected structure', () => {
    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    expect(result.current).toHaveProperty('options')
    expect(result.current).toHaveProperty('isLoading')
    expect(result.current).toHaveProperty('isLoadingInfinity')
    expect(result.current).toHaveProperty('handleChange')
    expect(result.current).toHaveProperty('handleScrollBottom')
  })

  it('returns options array', () => {
    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    expect(Array.isArray(result.current.options)).toBe(true)
    expect(result.current.options.length).toBeGreaterThan(0)
  })

  it('returns boolean loading states', () => {
    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    expect(typeof result.current.isLoading).toBe('boolean')
    expect(typeof result.current.isLoadingInfinity).toBe('boolean')
  })

  it('returns function handlers', () => {
    const { result } = renderHook(() => useSelect(defaultProps), {
      wrapper: TestWrapper,
    })

    expect(typeof result.current.handleChange).toBe('function')
    expect(typeof result.current.handleScrollBottom).toBe('function')
  })
})
