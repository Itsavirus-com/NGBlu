import { createCommonMocks, fireEvent, render, screen } from '@/utils/test-utils'

// Mock valtio with inline functions
jest.mock('valtio', () => ({
  useSnapshot: jest.fn(() => ({
    stacked: [
      {
        variant: 'success',
        displayTitle: 'Success',
        body: 'Operation completed successfully',
        visible: true,
      },
      {
        variant: 'danger',
        displayTitle: 'Error',
        body: 'Something went wrong',
        visible: true,
      },
    ],
  })),
  proxy: jest.fn(obj => obj),
}))

// Mock toast store actions with inline function
jest.mock('@/stores/toast-store.actions', () => ({
  hideStackedToast: jest.fn(),
}))

// Mock the stores that use proxy
jest.mock('@/stores/toast-model', () => ({
  initialToastModel: {
    variant: 'success',
    body: undefined,
    title: undefined,
    visible: false,
  },
}))

jest.mock('@/stores/toast-store', () => ({
  toastStore: {
    stacked: [
      {
        variant: 'success',
        displayTitle: 'Success',
        body: 'Operation completed successfully',
        visible: true,
      },
      {
        variant: 'danger',
        displayTitle: 'Error',
        body: 'Something went wrong',
        visible: true,
      },
    ],
  },
}))

// Mock react-bootstrap components
jest.mock('react-bootstrap', () => ({
  Toast: Object.assign(
    jest.fn(({ children, bg, autohide, delay, show, onClose }) =>
      show ? (
        <div
          data-testid="toast"
          data-bg={bg}
          data-autohide={autohide}
          data-delay={delay}
          data-show={show}
        >
          {children}
          <button onClick={onClose} data-testid="toast-close">
            Close
          </button>
        </div>
      ) : null
    ),
    {
      Body: jest.fn(({ children, className }) => (
        <div className={className} data-testid="toast-body">
          {children}
        </div>
      )),
    }
  ),
  ToastContainer: jest.fn(({ children, containerPosition, position, className }) => (
    <div
      data-testid="toast-container"
      data-container-position={containerPosition}
      data-position={position}
      className={className}
    >
      {children}
    </div>
  )),
}))

// Set up common mocks
createCommonMocks()

// Now import the component after mocking
import { Toast } from '../toast'

describe('<Toast />', () => {
  let mockHideStackedToast: jest.Mock

  beforeEach(() => {
    // Get the mocked function from the module
    const { hideStackedToast } = require('@/stores/toast-store.actions')
    mockHideStackedToast = hideStackedToast as jest.Mock
    mockHideStackedToast.mockClear()
  })

  it('renders toast container with correct props', () => {
    // Arrange & Act
    render(<Toast />)

    // Assert
    const container = screen.getByTestId('toast-container')
    expect(container).toHaveAttribute('data-container-position', 'fixed')
    expect(container).toHaveAttribute('data-position', 'top-end')
    expect(container).toHaveClass('p-3')
  })

  it('renders all toasts from store', () => {
    // Arrange & Act
    render(<Toast />)

    // Assert
    const toasts = screen.getAllByTestId('toast')
    expect(toasts).toHaveLength(2)
  })

  it('renders toast with correct variant', () => {
    // Arrange & Act
    render(<Toast />)

    // Assert
    const toasts = screen.getAllByTestId('toast')
    expect(toasts[0]).toHaveAttribute('data-bg', 'success')
    expect(toasts[1]).toHaveAttribute('data-bg', 'danger')
  })

  it('renders toast with correct autohide and delay', () => {
    // Arrange & Act
    render(<Toast />)

    // Assert
    const toasts = screen.getAllByTestId('toast')
    toasts.forEach(toast => {
      expect(toast).toHaveAttribute('data-autohide', 'true')
      expect(toast).toHaveAttribute('data-delay', '2500')
    })
  })

  it('displays toast titles and bodies', () => {
    // Arrange & Act
    render(<Toast />)

    // Assert
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('calls hideStackedToast when close button is clicked', () => {
    // Arrange
    render(<Toast />)

    // Act
    const closeButtons = screen.getAllByTestId('toast-close')
    fireEvent.click(closeButtons[0])

    // Assert
    expect(mockHideStackedToast).toHaveBeenCalledWith(0)
  })

  it('calls hideStackedToast when icon is clicked', () => {
    // Arrange
    render(<Toast />)

    // Act
    const icons = document.querySelectorAll('i.ki-cross')
    fireEvent.click(icons[0]) // Click first close icon

    // Assert
    expect(mockHideStackedToast).toHaveBeenCalledWith(0)
  })

  it('returns correct icon for different variants', () => {
    // This test checks the getIcon function indirectly through the rendered icons
    // Arrange & Act
    render(<Toast />)

    // Assert
    const verifyIcon = document.querySelector('i.ki-verify')
    const crossCircleIcon = document.querySelector('i.ki-cross-circle')

    expect(verifyIcon).toBeInTheDocument() // Success variant shows 'verify' icon
    expect(crossCircleIcon).toBeInTheDocument() // Danger variant shows 'cross-circle' icon
  })

  it('renders empty container when no toasts', () => {
    // Arrange
    const { useSnapshot } = require('valtio')
    useSnapshot.mockReturnValue({ stacked: [] })

    // Act
    render(<Toast />)

    // Assert
    expect(screen.getByTestId('toast-container')).toBeInTheDocument()
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument()
  })
})
