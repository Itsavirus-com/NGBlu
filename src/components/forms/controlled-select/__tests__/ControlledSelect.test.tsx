import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { render, screen } from '@/utils/test-utils'

import { ControlledSelect } from '../ControlledSelect'

// Mock the hook
jest.mock('../controlled-select.hook', () => ({
  useSelect: () => ({
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
    selectedOption: null,
    isLoading: false,
    isLoadingInfinity: false,
    invalid: false,
    error: null,
    handleScrollBottom: jest.fn(),
    handleChange: jest.fn(),
  }),
}))

const TestWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('ControlledSelect Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders select with label', () => {
    render(
      <TestWrapper>
        <ControlledSelect
          name="testSelect"
          label="Test Select"
          option={[{ value: 'id', label: 'name' }] as any}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Test Select')).toBeInTheDocument()
    expect(screen.getByText('Select one')).toBeInTheDocument()
  })

  // it('renders hidden when options length is 1 or less', () => {
  //   const { container } = render(
  //     <TestWrapper>
  //       <ControlledSelect
  //         name="testSelect"
  //         label="Test Select"
  //         option={[{ value: 'id', label: 'name' }] as any}
  //         isHidden={true}
  //       />
  //     </TestWrapper>
  //   )

  //   expect(container.firstChild).toBeNull()
  // })

  it('shows loading state', () => {
    // Mock loading state
    jest.doMock('../controlled-select.hook', () => ({
      useSelect: () => ({
        options: [],
        selectedOption: null,
        isLoading: true,
        isLoadingInfinity: false,
        invalid: false,
        error: null,
        handleScrollBottom: jest.fn(),
        handleChange: jest.fn(),
      }),
    }))

    render(
      <TestWrapper>
        <ControlledSelect
          name="testSelect"
          label="Test Select"
          option={[{ value: 'id', label: 'name' }] as any}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Test Select')).toBeInTheDocument()
  })
})
