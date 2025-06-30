import { render, screen } from '@/utils/test-utils'

import { SidebarMenuMain } from '../SidebarMenuMain'

// Mock all dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => `translated.${key}`),
}))

jest.mock('@/hooks/use-auth', () => ({
  useIsSuperAdmin: jest.fn(() => ({ isSuperAdmin: false })),
}))

jest.mock('../SidebarMenuItem', () => ({
  SidebarMenuItem: ({ title, to, icon }: { title: string; to: string; icon?: string }) => (
    <div data-testid="sidebar-menu-item" data-to={to} data-icon={icon}>
      {title}
    </div>
  ),
}))

jest.mock('../SidebarMenuItemWithSub', () => ({
  SidebarMenuItemWithSub: ({
    title,
    to,
    children,
  }: {
    title: string
    to: string
    children?: React.ReactNode
  }) => (
    <div data-testid="sidebar-menu-item-with-sub" data-to={to}>
      {title}
      {children}
    </div>
  ),
}))

jest.mock('../SidebarMenuSeparator', () => ({
  SidebarMenuSeparator: ({ title }: { title: string }) => (
    <div data-testid="sidebar-menu-separator">{title}</div>
  ),
}))

describe('<SidebarMenuMain />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dashboard menu item', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.dashboard')).toBeInTheDocument()
  })

  it('renders data validation separator', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.dataValidation')).toBeInTheDocument()
  })

  it('renders data management separator', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.dataManagement')).toBeInTheDocument()
  })

  it('renders KVK menu item', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.kvk')).toBeInTheDocument()
  })

  it('renders Google menu item', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.google')).toBeInTheDocument()
  })

  it('renders companies menu item', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.company')).toBeInTheDocument()
  })

  it('renders settings submenu', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.settings')).toBeInTheDocument()
  })

  it('does not render admin-only items when user is not super admin', () => {
    // Arrange
    const { useIsSuperAdmin } = require('@/hooks/use-auth')
    useIsSuperAdmin.mockReturnValue({ isSuperAdmin: false })

    // Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.queryByText('translated.users')).not.toBeInTheDocument()
    expect(screen.queryByText('translated.auditTrails')).not.toBeInTheDocument()
  })

  it('renders admin-only items when user is super admin', () => {
    // Arrange
    const { useIsSuperAdmin } = require('@/hooks/use-auth')
    useIsSuperAdmin.mockReturnValue({ isSuperAdmin: true })

    // Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.users')).toBeInTheDocument()
    expect(screen.getByText('translated.auditTrails')).toBeInTheDocument()
  })

  it('renders person submenu with sub-items', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    expect(screen.getByText('translated.person')).toBeInTheDocument()
  })

  it('renders all main menu sections', () => {
    // Arrange & Act
    render(<SidebarMenuMain />)

    // Assert
    // Check for separators
    expect(screen.getByText('translated.dataValidation')).toBeInTheDocument()
    expect(screen.getByText('translated.dataManagement')).toBeInTheDocument()

    // Check for some key menu items
    expect(screen.getByText('translated.dashboard')).toBeInTheDocument()
    expect(screen.getByText('translated.enterpriseRoots')).toBeInTheDocument()
    expect(screen.getByText('translated.businessPartners')).toBeInTheDocument()
    expect(screen.getByText('translated.address')).toBeInTheDocument()
  })
})
