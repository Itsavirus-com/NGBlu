import { render, screen } from '@/utils/test-utils'

import { BinaryView } from '../BinaryView'

// Set up mocks

// Mock useTranslations
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      yes: 'Yes',
      no: 'No',
    }
    return translations[key] || key
  }),
}))

// Mock react-bootstrap components
jest.mock('react-bootstrap', () => ({
  Col: jest.fn(({ children, xs, md, lg, ...props }) => (
    <div data-testid="col" data-xs={xs} data-md={md} data-lg={lg} {...props}>
      {children}
    </div>
  )),
  Placeholder: jest.fn(({ size, bg, className }) => (
    <div data-testid="placeholder" data-size={size} data-bg={bg} className={className}>
      Loading...
    </div>
  )),
}))

describe('<BinaryView />', () => {
  it('renders true value with success badge', () => {
    // Arrange & Act
    render(<BinaryView value={true} />)

    // Assert
    expect(screen.getByText('Yes')).toBeInTheDocument()
    const badge = screen.getByText('Yes')
    expect(badge).toHaveClass('badge', 'badge-light-success')
  })

  it('renders false value with danger badge', () => {
    // Arrange & Act
    render(<BinaryView value={false} />)

    // Assert
    expect(screen.getByText('No')).toBeInTheDocument()
    const badge = screen.getByText('No')
    expect(badge).toHaveClass('badge', 'badge-light-danger')
  })

  it('renders custom true label', () => {
    // Arrange & Act
    render(<BinaryView value={true} trueLabel="Active" />)

    // Assert
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.queryByText('Yes')).not.toBeInTheDocument()
  })

  it('renders custom false label', () => {
    // Arrange & Act
    render(<BinaryView value={false} falseLabel="Inactive" />)

    // Assert
    expect(screen.getByText('Inactive')).toBeInTheDocument()
    expect(screen.queryByText('No')).not.toBeInTheDocument()
  })

  it('renders label when provided', () => {
    // Arrange
    const label = 'Status'

    // Act
    render(<BinaryView value={true} label={label} />)

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument()
    const labelElement = screen.getByText(label)
    expect(labelElement).toHaveClass('fw-bold', 'form-label', 'mb-1')
  })

  it('does not render label when not provided', () => {
    // Arrange & Act
    render(<BinaryView value={true} />)

    // Assert
    const labels = screen.queryAllByRole('label')
    expect(labels).toHaveLength(0)
  })

  it('renders loading placeholder when isLoading is true', () => {
    // Arrange & Act
    render(<BinaryView value={true} isLoading={true} />)

    // Assert
    expect(screen.getByTestId('placeholder')).toBeInTheDocument()
    expect(screen.queryByText('Yes')).not.toBeInTheDocument()
  })

  it('renders with column wrapper by default', () => {
    // Arrange & Act
    render(<BinaryView value={true} />)

    // Assert
    const col = screen.getByTestId('col')
    expect(col).toHaveAttribute('data-xs', '12')
    expect(col).toHaveAttribute('data-md', '6')
    expect(col).toHaveAttribute('data-lg', '4')
  })

  it('renders without column wrapper when disableColumn is true', () => {
    // Arrange & Act
    render(<BinaryView value={true} disableColumn={true} />)

    // Assert
    expect(screen.queryByTestId('col')).not.toBeInTheDocument()
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })
})
