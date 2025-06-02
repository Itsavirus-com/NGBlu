import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { Table } from '../Table'
import { TableColumn } from '../table.type'

// Set up mocks
createCommonMocks()

// Mock child components
jest.mock('../DynamicTableBody', () => ({
  DynamicTableBody: jest.fn(() => <div data-testid="dynamic-table-body">Dynamic Table Body</div>),
}))

jest.mock('../StaticTableBody', () => ({
  StaticTableBody: jest.fn(() => <div data-testid="static-table-body">Static Table Body</div>),
}))

jest.mock('../Filter', () => ({
  Filter: jest.fn(({ children }) => <div data-testid="filter">{children}</div>),
}))

describe('<Table />', () => {
  const mockColumns: TableColumn<any>[] = [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
  ]

  it('renders table with title and description', () => {
    // Arrange
    const title = 'Users Table'
    const description = 'Manage all users'

    // Act
    render(<Table title={title} description={description} columns={mockColumns} data={[]} />)

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders static table body when data is provided', () => {
    // Arrange
    const data = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ]

    // Act
    render(<Table columns={mockColumns} data={data} />)

    // Assert
    expect(screen.getByTestId('static-table-body')).toBeInTheDocument()
    expect(screen.queryByTestId('dynamic-table-body')).not.toBeInTheDocument()
  })

  it('renders dynamic table body when apiPath is provided', () => {
    // Arrange
    const apiPath = '/api/users'

    // Act
    render(<Table columns={mockColumns} apiPath={apiPath} />)

    // Assert
    expect(screen.getByTestId('dynamic-table-body')).toBeInTheDocument()
    expect(screen.queryByTestId('static-table-body')).not.toBeInTheDocument()
  })

  it('renders toolbars when provided', () => {
    // Arrange
    const toolbars = [
      { label: 'Add User', variant: 'primary' as const },
      { label: 'Export', variant: 'secondary' as const },
    ]

    // Act
    render(<Table columns={mockColumns} data={[]} toolbars={toolbars} />)

    // Assert
    expect(screen.getByText('Add User')).toBeInTheDocument()
    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('renders filter component when filters are provided', () => {
    // Arrange
    const filters = <div>Filter Component</div>

    // Act
    render(<Table columns={mockColumns} data={[]} filters={filters} />)

    // Assert
    expect(screen.getByTestId('filter')).toBeInTheDocument()
    expect(screen.getByText('Filter Component')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    // Arrange
    const customClass = 'custom-table-class'

    // Act
    const { container } = render(<Table columns={mockColumns} data={[]} className={customClass} />)

    // Assert
    const tableContainer = container.querySelector(`.${customClass}`)
    expect(tableContainer).toHaveClass(customClass)
  })

  it('applies noPadding class when noPadding is true', () => {
    // Arrange & Act
    const { container } = render(<Table columns={mockColumns} data={[]} noPadding />)

    // Assert
    // When noPadding is true, it should NOT have the padding classes
    const tableElement = container.querySelector('div:not([data-testid])')
    expect(tableElement).not.toHaveClass('app-container', 'container-fluid')
  })

  it('applies padding classes by default', () => {
    // Arrange & Act
    const { container } = render(<Table columns={mockColumns} data={[]} />)

    // Assert
    const tableElement = container.querySelector('.app-container')
    expect(tableElement).toHaveClass('app-container', 'container-fluid')
  })
})
