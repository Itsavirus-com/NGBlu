import { render, screen } from '@/utils/test-utils'

import { Header } from '../header'

// Mock Navbar component
jest.mock('../navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}))

describe('<Header />', () => {
  it('renders header container with correct structure', () => {
    // Arrange & Act
    render(<Header />)

    // Assert
    const header = screen.getByTestId('navbar').parentElement!.parentElement!
    expect(header).toHaveClass('app-header')
    expect(header).toHaveAttribute('id', 'kt_app_header')
  })

  it('renders header container with correct classes', () => {
    // Arrange & Act
    render(<Header />)

    // Assert
    const container = screen.getByTestId('navbar').parentElement!
    expect(container).toHaveAttribute('id', 'kt_app_header_container')
    expect(container).toHaveClass(
      'app-container',
      'container-fluid',
      'd-flex',
      'align-items-stretch',
      'justify-content-between'
    )
  })

  it('renders empty div placeholder', () => {
    // Arrange & Act
    render(<Header />)

    // Assert
    const container = screen.getByTestId('navbar').parentElement!
    const emptyDiv = container.children[0]
    expect(emptyDiv).toBeInTheDocument()
    expect(emptyDiv.tagName).toBe('DIV')
    expect(emptyDiv).toBeEmptyDOMElement()
  })

  it('renders Navbar component', () => {
    // Arrange & Act
    render(<Header />)

    // Assert
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('renders components in correct order', () => {
    // Arrange & Act
    render(<Header />)

    // Assert
    const container = screen.getByTestId('navbar').parentElement!
    const children = Array.from(container.children)

    expect(children).toHaveLength(2)
    expect(children[0]).toBeEmptyDOMElement() // Empty div
    expect(children[1]).toHaveAttribute('data-testid', 'navbar')
  })
})
