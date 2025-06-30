import { fireEvent, render, screen, waitFor } from '@/utils/test-utils'

import { Filter } from '../filter'

describe('<Filter />', () => {
  it('renders filter button', () => {
    // Arrange & Act
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Assert - find button with filter text
    const filterButton = screen.getByRole('button', { name: /filter/i })
    expect(filterButton).toBeInTheDocument()
  })

  it('shows filter dropdown when button is clicked', () => {
    // Arrange
    render(
      <Filter onFilter={jest.fn()}>
        <div>Filter content</div>
      </Filter>
    )

    // Act
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))

    // Assert - check for "filterOptions" as one word (not "filter options")
    expect(screen.getByText('filterOptions')).toBeInTheDocument()
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
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))

    // Assert - check dropdown visibility by class
    const dropdown = screen.getByText('filterOptions').closest('.menu')
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
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

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
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))
    fireEvent.click(screen.getByRole('button', { name: /reset/i }))

    // Assert
    expect(onFilterMock).toHaveBeenCalledWith({})
  })

  it('renders children inside filter dropdown', () => {
    // Arrange
    const filterContent = <div data-testid="filter-content">Custom filter content</div>

    // Act
    render(<Filter onFilter={jest.fn()}>{filterContent}</Filter>)

    fireEvent.click(screen.getByRole('button', { name: /filter/i }))

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
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    // Assert
    const dropdown = screen.getByText('filterOptions').closest('.menu')
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
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))
    fireEvent.click(screen.getByRole('button', { name: /reset/i }))

    // Assert
    const dropdown = screen.getByText('filterOptions').closest('.menu')
    expect(dropdown).not.toHaveClass('show')
  })
})
