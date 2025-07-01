import { render, screen } from '@/utils/test-utils'

import { Sidebar } from '../sidebar'

// Mock child components
jest.mock('../SidebarLogo', () => ({
  SidebarLogo: () => <div data-testid="sidebar-logo">SidebarLogo</div>,
}))

jest.mock('../sidebar-menu/SidebarMenu', () => ({
  SidebarMenu: () => <div data-testid="sidebar-menu">SidebarMenu</div>,
}))

describe('<Sidebar />', () => {
  it('renders sidebar container with correct structure', () => {
    // Arrange & Act
    render(<Sidebar />)

    // Assert
    const sidebar = screen.getByTestId('sidebar-logo').parentElement!
    expect(sidebar).toHaveClass('app-sidebar', 'flex-column')
    expect(sidebar).toHaveAttribute('id', 'kt_app_sidebar')
  })

  it('renders SidebarLogo component', () => {
    // Arrange & Act
    render(<Sidebar />)

    // Assert
    expect(screen.getByTestId('sidebar-logo')).toBeInTheDocument()
  })

  it('renders SidebarMenu component', () => {
    // Arrange & Act
    render(<Sidebar />)

    // Assert
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument()
  })

  it('renders components in correct order', () => {
    // Arrange & Act
    render(<Sidebar />)

    // Assert
    const logo = screen.getByTestId('sidebar-logo')
    const menu = screen.getByTestId('sidebar-menu')
    const sidebar = logo.parentElement!

    expect(sidebar.children[0]).toBe(logo)
    expect(sidebar.children[1]).toBe(menu)
  })
})
