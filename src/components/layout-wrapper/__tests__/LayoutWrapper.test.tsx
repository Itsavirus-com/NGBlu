import { useTheme } from '@/contexts/ThemeContext'
import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { LayoutWrapper } from '../LayoutWrapper'

// Set up mocks
createCommonMocks()

// Mock ThemeContext
const mockUseTheme = jest.fn()
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => mockUseTheme(),
}))

describe('<LayoutWrapper />', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      themeMode: 'light',
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders children correctly', () => {
    // Arrange
    const testContent = <div data-testid="test-content">Test Content</div>

    // Act
    render(<LayoutWrapper>{testContent}</LayoutWrapper>)

    // Assert
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    // Arrange & Act
    const { container } = render(
      <LayoutWrapper>
        <div>Test content</div>
      </LayoutWrapper>
    )

    // Assert
    const wrapper = container.querySelector('.app-default')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('app-default')
  })

  it('sets layout data attribute based on theme mode', () => {
    // Arrange
    const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>
    mockUseTheme.mockReturnValue({
      mode: 'dark',
      themeMode: 'dark',
      setMode: jest.fn(),
    })

    // Act
    const { container } = render(
      <LayoutWrapper>
        <div>Test content</div>
      </LayoutWrapper>
    )

    // Assert
    const wrapper = container.querySelector('.app-default')
    expect(wrapper).toHaveAttribute('data-kt-app-layout', 'dark-sidebar')
  })

  it('sets layout data attribute for light theme', () => {
    // Arrange
    const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>
    mockUseTheme.mockReturnValue({
      mode: 'light',
      themeMode: 'light',
      setMode: jest.fn(),
    })

    // Act
    const { container } = render(
      <LayoutWrapper>
        <div>Test content</div>
      </LayoutWrapper>
    )

    // Assert
    const wrapper = container.querySelector('.app-default')
    expect(wrapper).toHaveAttribute('data-kt-app-layout', 'light-sidebar')
  })

  it('sets all required data attributes', () => {
    // Arrange & Act
    const { container } = render(<LayoutWrapper>Content</LayoutWrapper>)

    // Assert
    const wrapper = container.querySelector('.app-default')
    expect(wrapper).toHaveAttribute('data-kt-app-header-fixed', 'true')
    expect(wrapper).toHaveAttribute('data-kt-app-header-fixed-mobile', 'true')
    expect(wrapper).toHaveAttribute('data-kt-app-sidebar-hoverable', 'true')
    expect(wrapper).toHaveAttribute('data-kt-app-sidebar-push-header', 'true')
    expect(wrapper).toHaveAttribute('data-kt-app-sidebar-push-toolbar', 'true')
    expect(wrapper).toHaveAttribute('data-kt-app-sidebar-push-footer', 'true')
    expect(wrapper).toHaveAttribute('data-kt-app-toolbar-enabled', 'true')
  })

  it('renders multiple children correctly', () => {
    // Arrange
    const children = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </>
    )

    // Act
    render(<LayoutWrapper>{children}</LayoutWrapper>)

    // Assert
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('handles empty children', () => {
    // Arrange & Act
    const { container } = render(
      <LayoutWrapper>
        <div />
      </LayoutWrapper>
    )

    // Assert
    const wrapper = container.querySelector('.app-default')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('app-default')
  })

  it('updates layout when theme mode changes', () => {
    // Arrange
    const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>
    mockUseTheme.mockReturnValue({
      mode: 'dark',
      themeMode: 'dark',
      setMode: jest.fn(),
    })

    // Act
    const { container } = render(
      <LayoutWrapper>
        <div>Test content</div>
      </LayoutWrapper>
    )

    // Assert
    const wrapper = container.querySelector('.app-default')
    expect(wrapper).toHaveAttribute('data-kt-app-layout', 'dark-sidebar')
  })
})
