import { createCommonMocks, fireEvent, render, screen, waitFor } from '@/utils/test-utils'

import { Filter } from '../filter'

// Set up mocks
createCommonMocks()

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  FormProvider: jest.fn(({ children }) => <div data-testid="form-provider">{children}</div>),
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn(fn => (e: React.FormEvent) => {
      e.preventDefault()
      fn({ testField: 'test value' })
    }),
    reset: jest.fn(),
  })),
}))

// Mock useTranslations
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      filter: 'Filter',
      filterOptions: 'Filter Options',
      reset: 'Reset',
      apply: 'Apply',
    }
    return translations[key] || key
  }),
}))

describe('<Filter />', () => {
  it('renders filter button', () => {
    // Arrange & Act
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Assert
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  it('shows filter dropdown when button is clicked', () => {
    // Arrange
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByText('Filter'))

    // Assert
    expect(screen.getByText('Filter Options')).toBeInTheDocument()
    expect(screen.getByText('Filter content')).toBeInTheDocument()
  })

  it('hides filter dropdown when button is clicked again', () => {
    // Arrange
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Filter'))

    // Assert
    const dropdown = screen.getByText('Filter Options').closest('.menu')
    expect(dropdown).not.toHaveClass('show')
  })

  it('calls onFilter when form is submitted', async () => {
    // Arrange
    const onFilterMock = jest.fn()
    render(
      <Filter onFilter={onFilterMock}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Apply'))

    // Assert
    await waitFor(() => {
      expect(onFilterMock).toHaveBeenCalledWith({ testField: 'test value' })
    })
  })

  it('calls onFilter with empty object when reset is clicked', () => {
    // Arrange
    const onFilterMock = jest.fn()
    render(
      <Filter onFilter={onFilterMock}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Reset'))

    // Assert
    expect(onFilterMock).toHaveBeenCalledWith({})
  })

  it('renders children inside filter dropdown', () => {
    // Arrange
    const filterContent = <div data-testid="filter-content">Custom filter content</div>

    // Act
    render(<Filter onFilter={jest.fn()}>{filterContent}</Filter>)

    fireEvent.click(screen.getByText('Filter'))

    // Assert
    expect(screen.getByTestId('filter-content')).toBeInTheDocument()
    expect(screen.getByText('Custom filter content')).toBeInTheDocument()
  })

  it('hides form when no children are provided', () => {
    // Arrange & Act
    const { container } = render(<Filter onFilter={jest.fn()} />)

    // Assert
    const form = container.querySelector('form')
    expect(form).toHaveClass('d-none')
  })

  it('closes dropdown when apply button is clicked', () => {
    // Arrange
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Apply'))

    // Assert
    const dropdown = screen.getByText('Filter Options').closest('.menu')
    expect(dropdown).not.toHaveClass('show')
  })

  it('closes dropdown when reset button is clicked', () => {
    // Arrange
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByText('Filter'))
    fireEvent.click(screen.getByText('Reset'))

    // Assert
    const dropdown = screen.getByText('Filter Options').closest('.menu')
    expect(dropdown).not.toHaveClass('show')
  })
})
