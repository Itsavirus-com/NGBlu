import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { TextView } from '../TextView'

// Set up mocks
createCommonMocks()

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

describe('<TextView />', () => {
  it('renders text value correctly', () => {
    // Arrange
    const value = 'Sample text content'

    // Act
    render(<TextView value={value} />)

    // Assert
    expect(screen.getByText(value)).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    // Arrange
    const label = 'Description'
    const value = 'Sample text'

    // Act
    render(<TextView label={label} value={value} />)

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument()
    const labelElement = screen.getByText(label)
    expect(labelElement).toHaveClass('fw-bold', 'form-label', 'mb-1')
  })

  it('does not render label when not provided', () => {
    // Arrange & Act
    render(<TextView value="Sample text" />)

    // Assert
    const labels = screen.queryAllByRole('label')
    expect(labels).toHaveLength(0)
  })

  it('renders dash when value is empty', () => {
    // Arrange & Act
    render(<TextView value="" />)

    // Assert
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('renders dash when value is null', () => {
    // Arrange & Act
    render(<TextView value={null as any} />)

    // Assert
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('renders dash when value is undefined', () => {
    // Arrange & Act
    render(<TextView value={undefined} />)

    // Assert
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('renders loading placeholder when isLoading is true', () => {
    // Arrange & Act
    render(<TextView value="Sample text" isLoading={true} />)

    // Assert
    expect(screen.getByTestId('placeholder')).toBeInTheDocument()
    expect(screen.queryByText('Sample text')).not.toBeInTheDocument()
  })

  it('renders placeholder with correct props', () => {
    // Arrange & Act
    render(<TextView value="Sample text" isLoading={true} />)

    // Assert
    const placeholder = screen.getByTestId('placeholder')
    expect(placeholder).toHaveAttribute('data-size', 'lg')
    expect(placeholder).toHaveAttribute('data-bg', 'gray-500')
    expect(placeholder).toHaveClass('w-100')
  })

  it('renders with column wrapper by default', () => {
    // Arrange & Act
    render(<TextView value="Sample text" />)

    // Assert
    const col = screen.getByTestId('col')
    expect(col).toHaveAttribute('data-xs', '12')
    expect(col).toHaveAttribute('data-md', '6')
    expect(col).toHaveAttribute('data-lg', '4')
  })

  it('renders without column wrapper when disableColumn is true', () => {
    // Arrange & Act
    render(<TextView value="Sample text" disableColumn={true} />)

    // Assert
    expect(screen.queryByTestId('col')).not.toBeInTheDocument()
    expect(screen.getByText('Sample text')).toBeInTheDocument()
  })

  it('passes additional column props', () => {
    // Arrange & Act
    render(<TextView value="Sample text" xl={3} className="custom-class" />)

    // Assert
    const col = screen.getByTestId('col')
    expect(col).toHaveAttribute('xl', '3')
    expect(col).toHaveClass('custom-class')
  })

  it('renders content with correct structure', () => {
    // Arrange & Act
    render(<TextView value="Sample text" label="Test Label" />)

    // Assert
    const label = screen.getByText('Test Label')
    const text = screen.getByText('Sample text')

    expect(label.tagName).toBe('LABEL')
    expect(text.tagName).toBe('P')
    expect(text).toHaveClass('m-0')
  })

  it('handles numeric values', () => {
    // Arrange & Act
    render(<TextView value={123} />)

    // Assert
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('handles string representation of boolean values', () => {
    // Arrange & Act
    render(<TextView value="true" />)

    // Assert
    expect(screen.getByText('true')).toBeInTheDocument()
  })

  it('renders multiline text correctly', () => {
    // Arrange
    const multilineText = 'Line 1\nLine 2\nLine 3'

    // Act
    render(<TextView value={multilineText} />)

    // Assert
    expect(screen.getByText(multilineText)).toBeInTheDocument()
  })
})
