import { render, screen } from '@/utils/test-utils'

import Loading from '../Loading'

// Set up mocks

// Mock react-bootstrap Spinner
jest.mock('react-bootstrap', () => ({
  Spinner: jest.fn(({ animation, variant }) => (
    <div data-testid="spinner" data-animation={animation} data-variant={variant}>
      Loading...
    </div>
  )),
}))

describe('<Loading />', () => {
  it('renders loading spinner', () => {
    // Arrange & Act
    render(<Loading />)

    // Assert
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders spinner with correct animation', () => {
    // Arrange & Act
    render(<Loading />)

    // Assert
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-animation', 'border')
  })

  it('renders spinner with correct variant', () => {
    // Arrange & Act
    render(<Loading />)

    // Assert
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-variant', 'primary')
  })

  it('centers the spinner in the container', () => {
    // Arrange & Act
    const { container } = render(<Loading />)

    // Assert
    const loadingContainer = container.querySelector('.h-100')
    expect(loadingContainer).toHaveClass('d-flex', 'align-items-center', 'justify-content-center')
  })
})
