import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { Page } from '../Page'

// Set up mocks
createCommonMocks()

// Mock react-bootstrap Button
jest.mock('react-bootstrap', () => ({
  Button: jest.fn(({ children, variant, ...props }) => (
    <button data-variant={variant} {...props}>
      {children}
    </button>
  )),
}))

describe('<Page />', () => {
  it('renders children correctly', () => {
    // Arrange
    const testContent = <div data-testid="test-content">Test Content</div>

    // Act
    render(<Page>{testContent}</Page>)

    // Assert
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default CSS classes', () => {
    // Arrange & Act
    const { container } = render(
      <Page>
        <div>Content</div>
      </Page>
    )

    // Assert
    // Look for the page container inside the test wrapper
    const pageContainer = container.querySelector('.app-container.container-fluid')
    expect(pageContainer).toBeInTheDocument()
    expect(pageContainer).toHaveClass('app-container', 'container-fluid')
  })

  it('applies custom className', () => {
    // Arrange
    const customClass = 'custom-page-class'

    // Act
    const { container } = render(
      <Page className={customClass}>
        <div>Content</div>
      </Page>
    )

    // Assert
    const pageContainer = container.querySelector('.app-container')
    expect(pageContainer).toHaveClass('app-container', 'container-fluid', customClass)
  })

  it('renders title when provided', () => {
    // Arrange
    const title = 'Page Title'

    // Act
    render(
      <Page title={title}>
        <div>Content</div>
      </Page>
    )

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(title)).toHaveClass('card-label', 'fw-bold', 'fs-3', 'mb-1')
  })

  it('renders description when provided', () => {
    // Arrange
    const description = 'Page description'

    // Act
    render(
      <Page description={description}>
        <div>Content</div>
      </Page>
    )

    // Assert
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(description)).toHaveClass('text-muted', 'fw-semibold', 'fs-7')
  })

  it('renders both title and description', () => {
    // Arrange
    const title = 'Page Title'
    const description = 'Page description'

    // Act
    render(
      <Page title={title} description={description}>
        <div>Content</div>
      </Page>
    )

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders toolbars when provided', () => {
    // Arrange
    const toolbars = [
      { children: 'Add Item', variant: 'primary' },
      { children: 'Export', variant: 'secondary' },
    ]

    // Act
    render(
      <Page toolbars={toolbars}>
        <div>Content</div>
      </Page>
    )

    // Assert
    expect(screen.getByText('Add Item')).toBeInTheDocument()
    expect(screen.getByText('Export')).toBeInTheDocument()

    const addButton = screen.getByText('Add Item')
    const exportButton = screen.getByText('Export')
    expect(addButton).toHaveAttribute('data-variant', 'primary')
    expect(exportButton).toHaveAttribute('data-variant', 'secondary')
  })

  it('does not render header when no title, description, or toolbars', () => {
    // Arrange & Act
    render(
      <Page>
        <div>Content</div>
      </Page>
    )

    // Assert
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    const cardHeader = document.querySelector('.card-header')
    expect(cardHeader).not.toBeInTheDocument()
  })

  it('renders header when title is provided', () => {
    // Arrange & Act
    render(
      <Page title="Test Title">
        <div>Content</div>
      </Page>
    )

    // Assert
    const cardHeader = document.querySelector('.card-header')
    expect(cardHeader).toBeInTheDocument()
    expect(cardHeader).toHaveClass('border-0', 'pt-3')
  })

  it('renders header when description is provided', () => {
    // Arrange & Act
    render(
      <Page description="Test Description">
        <div>Content</div>
      </Page>
    )

    // Assert
    const cardHeader = document.querySelector('.card-header')
    expect(cardHeader).toBeInTheDocument()
  })

  it('renders header when toolbars are provided', () => {
    // Arrange & Act
    render(
      <Page toolbars={[{ children: 'Button' }]}>
        <div>Content</div>
      </Page>
    )

    // Assert
    const cardHeader = document.querySelector('.card-header')
    expect(cardHeader).toBeInTheDocument()
  })

  it('renders card body with correct classes', () => {
    // Arrange & Act
    render(
      <Page>
        <div data-testid="content">Content</div>
      </Page>
    )

    // Assert
    const cardBody = screen.getByTestId('content').parentElement
    expect(cardBody).toHaveClass('card-body', 'py-5')
  })

  it('renders multiple toolbars correctly', () => {
    // Arrange
    const toolbars = [
      { children: 'Button 1', variant: 'primary' },
      { children: 'Button 2', variant: 'secondary' },
      { children: 'Button 3', variant: 'success' },
    ]

    // Act
    render(
      <Page toolbars={toolbars}>
        <div>Content</div>
      </Page>
    )

    // Assert
    expect(screen.getByText('Button 1')).toBeInTheDocument()
    expect(screen.getByText('Button 2')).toBeInTheDocument()
    expect(screen.getByText('Button 3')).toBeInTheDocument()
  })

  it('handles undefined className gracefully', () => {
    // Arrange & Act
    const { container } = render(
      <Page className={undefined}>
        <div>Content</div>
      </Page>
    )

    // Assert
    const pageContainer = container.querySelector('.app-container')
    expect(pageContainer).toHaveClass('app-container', 'container-fluid')
  })
})
