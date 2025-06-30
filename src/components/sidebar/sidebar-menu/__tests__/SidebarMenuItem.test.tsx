import { render, screen } from '@/utils/test-utils'

import { SidebarMenuItem } from '../SidebarMenuItem'

// Mock dependencies
jest.mock('@/components/kt-icon/KtIcon', () => ({
  KTIcon: ({ iconName, className }: { iconName: string; className: string }) => (
    <span data-testid="kt-icon" data-icon={iconName} className={className}>
      Icon
    </span>
  ),
}))

jest.mock('@/navigation', () => ({
  usePathname: jest.fn(() => '/dashboard/users'),
}))

jest.mock('../helper', () => ({
  checkIsActive: jest.fn((pathname, url) => pathname === url),
}))

describe('<SidebarMenuItem />', () => {
  const defaultProps = {
    to: '/dashboard/users',
    title: 'Users',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders menu item with correct structure', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} />)

    // Assert
    const menuItem = screen.getByRole('link').parentElement!
    expect(menuItem).toHaveClass('menu-item')
  })

  it('renders link with correct href and classes', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} />)

    // Assert
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/dashboard/users')
    expect(link).toHaveClass('menu-link', 'without-sub')
  })

  it('renders title text', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} title="User Management" />)

    // Assert
    expect(screen.getByText('User Management')).toBeInTheDocument()
    expect(screen.getByText('User Management')).toHaveClass('menu-title')
  })

  it('renders icon when provided', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} icon="user" />)

    // Assert
    const icon = screen.getByTestId('kt-icon')
    expect(icon).toHaveAttribute('data-icon', 'user')
    expect(icon).toHaveClass('fs-2')
    expect(icon.parentElement).toHaveClass('menu-icon')
  })

  it('does not render icon when not provided', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} />)

    // Assert
    expect(screen.queryByTestId('kt-icon')).not.toBeInTheDocument()
  })

  it('renders bullet when hasBullet is true', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} hasBullet />)

    // Assert
    const bullet = screen.getByRole('link').querySelector('.menu-bullet')
    expect(bullet).toBeInTheDocument()
    expect(bullet).toHaveClass('menu-bullet')

    const bulletDot = bullet!.querySelector('.bullet')
    expect(bulletDot).toHaveClass('bullet', 'bullet-dot')
  })

  it('does not render bullet when hasBullet is false', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} hasBullet={false} />)

    // Assert
    const bullet = screen.getByRole('link').querySelector('.menu-bullet')
    expect(bullet).not.toBeInTheDocument()
  })

  it('applies active class when item is active', () => {
    // Arrange
    const { checkIsActive } = require('../helper')
    checkIsActive.mockReturnValue(true)

    // Act
    render(<SidebarMenuItem {...defaultProps} />)

    // Assert
    const link = screen.getByRole('link')
    expect(link).toHaveClass('active')
  })

  it('does not apply active class when item is not active', () => {
    // Arrange
    const { checkIsActive } = require('../helper')
    checkIsActive.mockReturnValue(false)

    // Act
    render(<SidebarMenuItem {...defaultProps} />)

    // Assert
    const link = screen.getByRole('link')
    expect(link).not.toHaveClass('active')
  })

  it('renders children when provided', () => {
    // Arrange & Act
    render(
      <SidebarMenuItem {...defaultProps}>
        <div data-testid="child-content">Child Content</div>
      </SidebarMenuItem>
    )

    // Assert
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('renders with icon and bullet together', () => {
    // Arrange & Act
    render(<SidebarMenuItem {...defaultProps} icon="settings" hasBullet />)

    // Assert
    expect(screen.getByTestId('kt-icon')).toBeInTheDocument()
    const bullet = screen.getByRole('link').querySelector('.menu-bullet')
    expect(bullet).toBeInTheDocument()
  })
})
