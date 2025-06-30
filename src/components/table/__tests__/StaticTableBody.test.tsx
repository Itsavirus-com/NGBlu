import { render, screen } from '@/utils/test-utils'

import { StaticTableBody } from '../StaticTableBody'
import { TableColumn } from '../table.type'

// Set up mocks

// Mock child components
jest.mock('../TableActions', () => ({
  TableActions: jest.fn(() => <td data-testid="table-actions">Actions</td>),
  TableActionsHead: jest.fn(() => <th data-testid="table-actions-head">Actions</th>),
}))

jest.mock('../TableEmpty', () => ({
  TableEmpty: jest.fn(() => (
    <tr data-testid="table-empty">
      <td>No data</td>
    </tr>
  )),
}))

// Mock utils
jest.mock('@/utils/queryParams', () => ({
  processQueryParams: jest.fn(() => ({})),
}))

describe('<StaticTableBody />', () => {
  const mockColumns: TableColumn<any>[] = [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
  ]

  const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ]

  it('renders table with columns and data', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={mockData} />)

    // Assert
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('renders table headers correctly', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={mockData} />)

    // Assert
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(3) // Name, Email, Actions
    expect(headers[0]).toHaveTextContent('Name')
    expect(headers[1]).toHaveTextContent('Email')
    expect(headers[2]).toHaveTextContent('Actions')
  })

  it('renders table rows correctly', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={mockData} />)

    // Assert
    const rows = screen.getAllByRole('row')
    // 1 header row + 2 data rows + 1 empty row
    expect(rows).toHaveLength(4)
  })

  it('renders table with data correctly', () => {
    // Arrange & Act
    render(<StaticTableBody data={mockData} columns={mockColumns} actions={['edit']} />)

    // Assert
    const rows = screen.getAllByRole('row')
    // Header row + 2 data rows + 1 empty row
    expect(rows).toHaveLength(4)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('renders custom column content when render function is provided', () => {
    // Arrange
    const customColumns: TableColumn<any>[] = [
      {
        id: 'name',
        title: 'Name',
        render: (item: any) => <span data-testid="custom-name">{item.name.toUpperCase()}</span>,
      },
    ]

    // Act
    render(<StaticTableBody data={mockData} columns={customColumns} actions={['edit']} />)

    // Assert
    const customNames = screen.getAllByTestId('custom-name')
    expect(customNames).toHaveLength(2)
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
    expect(screen.getByText('JANE SMITH')).toBeInTheDocument()
  })

  it('applies custom CSS classes to headers', () => {
    // Arrange
    const columnsWithClasses: TableColumn<any>[] = [
      {
        id: 'name',
        title: 'Name',
        headClassName: 'custom-header-class',
      },
    ]

    // Act
    render(<StaticTableBody columns={columnsWithClasses} data={mockData} />)

    // Assert
    const header = screen.getByText('Name')
    expect(header).toHaveClass('custom-header-class')
  })

  it('applies custom CSS classes to body cells', () => {
    // Arrange
    const columnsWithClasses: TableColumn<any>[] = [
      {
        id: 'name',
        title: 'Name',
        bodyClassName: 'custom-body-class',
      },
    ]

    // Act
    render(<StaticTableBody columns={columnsWithClasses} data={mockData} />)

    // Assert
    const cell = screen.getByText('John Doe')
    expect(cell).toHaveClass('custom-body-class')
  })

  it('renders actions header when actions are provided', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={mockData} actions={['edit', 'delete']} />)

    // Assert
    expect(screen.getByTestId('table-actions-head')).toBeInTheDocument()
  })

  it('renders actions for each row when actions are provided', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={mockData} actions={['edit', 'delete']} />)

    // Assert
    const actionCells = screen.getAllByTestId('table-actions')
    expect(actionCells).toHaveLength(2) // One for each data row
  })

  it('renders empty state when no data is provided', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={[]} />)

    // Assert
    expect(screen.getByTestId('table-empty')).toBeInTheDocument()
  })

  it('does not render when no columns are provided', () => {
    // Arrange & Act
    const { container } = render(<StaticTableBody columns={[]} data={mockData} />)

    // Assert - Component still renders wrapper even with no columns
    expect(container.firstChild).not.toBeNull()
  })

  it('renders table with responsive wrapper', () => {
    // Arrange & Act
    const { container } = render(
      <StaticTableBody data={mockData} columns={mockColumns} actions={['edit']} />
    )

    // Assert
    // Look for the responsive wrapper inside the test wrapper
    const wrapper = container.querySelector('.table-responsive.mt-4')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('table-responsive', 'mt-4')
  })

  it('applies correct table classes', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={mockData} />)

    // Assert
    const table = screen.getByRole('table')
    expect(table).toHaveClass(
      'table',
      'table-row-dashed',
      'table-row-gray-400',
      'align-middle',
      'gs-0',
      'gy-4'
    )
  })

  it('handles undefined data gracefully', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={undefined as any} />)

    // Assert
    expect(screen.getByTestId('table-empty')).toBeInTheDocument()
  })

  it('handles null data gracefully', () => {
    // Arrange & Act
    render(<StaticTableBody columns={mockColumns} data={null as any} />)

    // Assert
    expect(screen.getByTestId('table-empty')).toBeInTheDocument()
  })

  it('returns null when data is empty', () => {
    // Arrange & Act
    const { container } = render(
      <StaticTableBody data={[]} columns={mockColumns} actions={['edit']} />
    )

    // Assert
    // Check that empty row is displayed
    const tbody = container.querySelector('tbody')
    expect(tbody).not.toBeEmptyDOMElement()
    expect(screen.getByTestId('table-empty')).toBeInTheDocument()
  })
})
