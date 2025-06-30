import { render, screen } from '@/utils/test-utils'

import { SidebarLogo } from '../SidebarLogo'

// Mock KTIcon component
jest.mock('../../kt-icon/KtIcon', () => ({
  KTIcon: ({ iconName, className }: { iconName: string; className: string }) => (
    <span data-testid="kt-icon" data-icon={iconName} className={className}>
      Icon
    </span>
  ),
}))

describe('<SidebarLogo />', () => {
  it('renders logo container with correct structure', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const container = screen.getByRole('link').parentElement!
    expect(container).toHaveClass('app-sidebar-logo', 'px-6')
    expect(container).toHaveAttribute('id', 'kt_app_sidebar_logo')
  })

  it('renders dashboard link', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/dashboard')
  })

  it('renders default logo image', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const images = screen.getAllByRole('img', { name: 'Logo' })
    const defaultLogo = images.find(img => img.classList.contains('app-sidebar-logo-default'))

    expect(defaultLogo).toBeInTheDocument()
    expect(defaultLogo).toHaveAttribute('height', '40')
    expect(defaultLogo).toHaveClass('h-40px', 'app-sidebar-logo-default')
  })

  it('renders minimize logo image', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const images = screen.getAllByRole('img', { name: 'Logo' })
    const minimizeLogo = images.find(img => img.classList.contains('app-sidebar-logo-minimize'))

    expect(minimizeLogo).toBeInTheDocument()
    expect(minimizeLogo).toHaveAttribute('width', '40')
    expect(minimizeLogo).toHaveClass('h-40px', 'app-sidebar-logo-minimize')
  })

  it('renders sidebar toggle button', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const toggleButton = screen.getByTestId('kt-icon').parentElement!
    expect(toggleButton).toHaveAttribute('id', 'kt_app_sidebar_toggle')
    expect(toggleButton).toHaveAttribute('data-kt-toggle', 'true')
    expect(toggleButton).toHaveAttribute('data-kt-toggle-state', 'active')
    expect(toggleButton).toHaveAttribute('data-kt-toggle-target', 'body')
    expect(toggleButton).toHaveAttribute('data-kt-toggle-name', 'app-sidebar-minimize')
  })

  it('renders toggle button with correct classes', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const toggleButton = screen.getByTestId('kt-icon').parentElement!
    expect(toggleButton).toHaveClass(
      'app-sidebar-toggle',
      'btn',
      'btn-icon',
      'btn-shadow',
      'btn-sm',
      'btn-color-muted',
      'btn-active-color-primary',
      'h-30px',
      'w-30px',
      'position-absolute',
      'top-50',
      'start-100',
      'translate-middle',
      'rotate'
    )
  })

  it('renders toggle icon with correct props', () => {
    // Arrange & Act
    render(<SidebarLogo />)

    // Assert
    const icon = screen.getByTestId('kt-icon')
    expect(icon).toHaveAttribute('data-icon', 'black-left-line')
    expect(icon).toHaveClass('fs-3', 'rotate-180', 'ms-1')
  })
})
