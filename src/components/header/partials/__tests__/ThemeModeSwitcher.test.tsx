import { fireEvent, render, screen } from '@/utils/test-utils'

import { ThemeModeSwitcher } from '../ThemeModeSwitcher'

// Mock dependencies
jest.mock('@/components/kt-icon/KtIcon', () => ({
  KTIcon: ({ iconName, className }: { iconName: string; className: string }) => (
    <div data-testid={`kt-icon-${iconName}`} data-class={className}>
      {iconName}
    </div>
  ),
}))

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}))

const mockUseTheme = jest.mocked(require('@/contexts/ThemeContext').useTheme)
const mockSetMode = jest.fn()

describe('<ThemeModeSwitcher />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTheme.mockReturnValue({
      mode: 'light',
      themeMode: 'light',
      setMode: mockSetMode,
    })
  })

  it('renders toggle button with default classes', () => {
    // Arrange & Act
    render(<ThemeModeSwitcher />)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-icon')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders toggle button with custom classes', () => {
    // Arrange & Act
    render(<ThemeModeSwitcher toggleBtnClass="custom-class" />)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-icon', 'custom-class')
  })

  it('displays moon icon when theme is dark', () => {
    // Arrange
    mockUseTheme.mockReturnValue({
      mode: 'dark',
      themeMode: 'dark',
      setMode: mockSetMode,
    })

    // Act
    render(<ThemeModeSwitcher />)

    // Assert
    const moonIcon = screen.getByTestId('kt-icon-moon')
    expect(moonIcon).toBeInTheDocument()
    expect(moonIcon).toHaveAttribute('data-class', 'theme-light-hide fs-1')
  })

  it('displays sun icon when theme is light', () => {
    // Arrange
    mockUseTheme.mockReturnValue({
      mode: 'light',
      themeMode: 'light',
      setMode: mockSetMode,
    })

    // Act
    render(<ThemeModeSwitcher />)

    // Assert
    const sunIcon = screen.getByTestId('kt-icon-night-day')
    expect(sunIcon).toBeInTheDocument()
    expect(sunIcon).toHaveAttribute('data-class', 'theme-dark-hide fs-1')
  })

  it('uses custom icon class when provided', () => {
    // Arrange & Act
    render(<ThemeModeSwitcher toggleBtnIconClass="custom-icon-class" />)

    // Assert
    const sunIcon = screen.getByTestId('kt-icon-night-day')
    expect(sunIcon).toHaveAttribute('data-class', 'theme-dark-hide custom-icon-class')
  })

  it('opens dropdown menu when button is clicked', () => {
    // Arrange
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })

  it('closes dropdown menu when button is clicked again', () => {
    // Arrange
    render(<ThemeModeSwitcher />)
    const button = screen.getByRole('button')

    // Act
    fireEvent.click(button) // Open
    fireEvent.click(button) // Close

    // Assert
    expect(screen.queryByText('Light')).not.toBeInTheDocument()
    expect(screen.queryByText('Dark')).not.toBeInTheDocument()
    expect(screen.queryByText('System')).not.toBeInTheDocument()
  })

  it('renders dropdown with correct styling', () => {
    // Arrange
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    const dropdown = screen.getByText('Light').parentElement!
    expect(dropdown).toHaveClass(
      'position-absolute',
      'top-100',
      'end-0',
      'mt-2',
      'rounded',
      'shadow-sm',
      'p-2'
    )
    expect(dropdown).toHaveStyle({
      minWidth: '175px',
      zIndex: 105,
      backgroundColor: 'var(--bs-body-bg)',
      border: '1px solid var(--bs-border-color)',
    })
  })

  it('highlights active light theme', () => {
    // Arrange
    mockUseTheme.mockReturnValue({
      mode: 'light',
      themeMode: 'light',
      setMode: mockSetMode,
    })
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    const lightButton = screen.getByRole('button', { name: /light/i })
    expect(lightButton).toHaveClass('active', 'btn-active-light-primary')
  })

  it('highlights active dark theme', () => {
    // Arrange
    mockUseTheme.mockReturnValue({
      mode: 'dark',
      themeMode: 'dark',
      setMode: mockSetMode,
    })
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    const darkButton = screen.getByRole('button', { name: /dark/i })
    expect(darkButton).toHaveClass('active', 'btn-active-light-primary')
  })

  it('highlights active system theme', () => {
    // Arrange
    mockUseTheme.mockReturnValue({
      mode: 'system',
      themeMode: 'light', // themeMode can be different from mode for system
      setMode: mockSetMode,
    })
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    const systemButton = screen.getByRole('button', { name: /system/i })
    expect(systemButton).toHaveClass('active', 'btn-active-light-primary')
  })

  it('switches to light mode when light button is clicked', () => {
    // Arrange
    render(<ThemeModeSwitcher />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Act
    const lightButton = screen.getByText('Light')
    fireEvent.click(lightButton)

    // Assert
    expect(mockSetMode).toHaveBeenCalledWith('light')
    expect(screen.queryByText('Light')).not.toBeInTheDocument() // Menu should close
  })

  it('switches to dark mode when dark button is clicked', () => {
    // Arrange
    render(<ThemeModeSwitcher />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Act
    const darkButton = screen.getByText('Dark')
    fireEvent.click(darkButton)

    // Assert
    expect(mockSetMode).toHaveBeenCalledWith('dark')
    expect(screen.queryByText('Dark')).not.toBeInTheDocument() // Menu should close
  })

  it('switches to system mode when system button is clicked', () => {
    // Arrange
    render(<ThemeModeSwitcher />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Act
    const systemButton = screen.getByText('System')
    fireEvent.click(systemButton)

    // Assert
    expect(mockSetMode).toHaveBeenCalledWith('system')
    expect(screen.queryByText('System')).not.toBeInTheDocument() // Menu should close
  })

  it('renders theme option buttons with correct icons', () => {
    // Arrange
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    expect(screen.getAllByTestId('kt-icon-night-day')).toHaveLength(2) // Toggle + Light option
    expect(screen.getByTestId('kt-icon-moon')).toBeInTheDocument() // Dark option
    expect(screen.getByTestId('kt-icon-screen')).toBeInTheDocument() // System option
  })

  it('renders theme option buttons with correct classes', () => {
    // Arrange
    render(<ThemeModeSwitcher />)

    // Act
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    const lightButton = screen.getByRole('button', { name: /light/i })
    const darkButton = screen.getByRole('button', { name: /dark/i })
    const systemButton = screen.getByRole('button', { name: /system/i })

    const themeButtons = [lightButton, darkButton, systemButton]
    themeButtons.forEach(btn => {
      expect(btn).toHaveClass('btn', 'w-100', 'text-start')
      expect(btn).toHaveAttribute('type', 'button')
    })
  })

  it('renders main container with correct positioning', () => {
    // Arrange & Act
    render(<ThemeModeSwitcher />)

    // Assert
    const container = screen.getByRole('button').parentElement!
    expect(container).toHaveClass('position-relative')
  })
})
