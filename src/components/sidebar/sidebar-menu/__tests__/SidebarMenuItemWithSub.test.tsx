import { render, screen } from '@/utils/test-utils'

import { SidebarMenuItemWithSub } from '../SidebarMenuItemWithSub'

// Mock dependencies
jest.mock('@/components/kt-icon/KtIcon', () => ({
  KTIcon: ({ iconName, className }: { iconName: string; className: string }) => (
    <span data-testid="kt-icon" data-icon={iconName} className={className}>
      Icon
    </span>
  ),
}))

jest.mock('@/navigation', () => ({
  usePathname: jest.fn(() => '/dashboard/settings'),
}))

jest.mock('../helper', () => ({
  checkIsActive: jest.fn((pathname, url) => pathname.includes(url)),
}))

describe('<SidebarMenuItemWithSub />', () => {
  const defaultProps = {
    to: '/dashboard/settings',
    title: 'Settings',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders menu item with correct structure', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    const menuItem = screen.getByText('Settings').parentElement!.parentElement!
    expect(menuItem).toHaveClass('menu-item', 'menu-accordion')
    expect(menuItem).toHaveAttribute('data-kt-menu-trigger', 'click')
  })

  it('renders menu link with correct classes', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    const menuLink = screen.getByText('Settings').parentElement!
    expect(menuLink).toHaveClass('menu-link')
  })

  it('renders title text', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} title="System Settings" />)

    // Assert
    const title = screen.getByText('System Settings')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('menu-title')
  })

  it('renders menu arrow', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    const arrow = screen.getByText('Settings').parentElement!.querySelector('.menu-arrow')
    expect(arrow).toBeInTheDocument()
    expect(arrow).toHaveClass('menu-arrow')
  })

  it('renders icon when provided', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} icon="settings" />)

    // Assert
    const icon = screen.getByTestId('kt-icon')
    expect(icon).toHaveAttribute('data-icon', 'settings')
    expect(icon.parentElement).toHaveClass('menu-icon')
  })

  it('does not render icon when not provided', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    expect(screen.queryByTestId('kt-icon')).not.toBeInTheDocument()
  })

  it('renders bullet when hasBullet is true', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} hasBullet />)

    // Assert
    const bullet = screen.getByText('Settings').parentElement!.querySelector('.menu-bullet')
    expect(bullet).toBeInTheDocument()
    expect(bullet).toHaveClass('menu-bullet')

    const bulletDot = bullet!.querySelector('.bullet')
    expect(bulletDot).toHaveClass('bullet', 'bullet-dot')
  })

  it('does not render bullet when hasBullet is false', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} hasBullet={false} />)

    // Assert
    const bullet = screen.getByText('Settings').parentElement!.querySelector('.menu-bullet')
    expect(bullet).not.toBeInTheDocument()
  })

  it('applies active classes when item is active', () => {
    // Arrange
    const { checkIsActive } = require('../helper')
    checkIsActive.mockReturnValue(true)

    // Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    const menuItem = screen.getByText('Settings').parentElement!.parentElement!
    expect(menuItem).toHaveClass('here', 'show')

    const submenu = menuItem.querySelector('.menu-sub')
    expect(submenu).toHaveClass('menu-active-bg')
  })

  it('does not apply active classes when item is not active', () => {
    // Arrange
    const { checkIsActive } = require('../helper')
    checkIsActive.mockReturnValue(false)

    // Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    const menuItem = screen.getByText('Settings').parentElement!.parentElement!
    expect(menuItem).not.toHaveClass('here', 'show')

    const submenu = menuItem.querySelector('.menu-sub')
    expect(submenu).not.toHaveClass('menu-active-bg')
  })

  it('renders submenu container with correct classes', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} />)

    // Assert
    const submenu = screen
      .getByText('Settings')
      .parentElement!.parentElement!.querySelector('.menu-sub')
    expect(submenu).toHaveClass('menu-sub', 'menu-sub-accordion')
  })

  it('renders children in submenu', () => {
    // Arrange & Act
    render(
      <SidebarMenuItemWithSub {...defaultProps}>
        <div data-testid="submenu-item">Submenu Item</div>
      </SidebarMenuItemWithSub>
    )

    // Assert
    expect(screen.getByTestId('submenu-item')).toBeInTheDocument()

    const submenu = screen
      .getByText('Settings')
      .parentElement!.parentElement!.querySelector('.menu-sub')
    expect(submenu).toContainElement(screen.getByTestId('submenu-item'))
  })

  it('renders with icon and bullet together', () => {
    // Arrange & Act
    render(<SidebarMenuItemWithSub {...defaultProps} icon="gear" hasBullet />)

    // Assert
    expect(screen.getByTestId('kt-icon')).toBeInTheDocument()
    const bullet = screen.getByText('Settings').parentElement!.querySelector('.menu-bullet')
    expect(bullet).toBeInTheDocument()
  })
})
