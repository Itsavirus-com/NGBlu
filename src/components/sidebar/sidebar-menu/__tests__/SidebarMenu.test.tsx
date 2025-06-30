import { render, screen } from '@/utils/test-utils'

import { SidebarMenu } from '../SidebarMenu'

// Mock SidebarMenuMain component
jest.mock('../SidebarMenuMain', () => ({
  SidebarMenuMain: () => <div data-testid="sidebar-menu-main">SidebarMenuMain</div>,
}))

describe('<SidebarMenu />', () => {
  it('renders menu container with correct structure', () => {
    // Arrange & Act
    render(<SidebarMenu />)

    // Assert
    const container =
      screen.getByTestId('sidebar-menu-main').parentElement!.parentElement!.parentElement!
    expect(container).toHaveClass('app-sidebar-menu', 'overflow-hidden', 'flex-column-fluid')
  })

  it('renders wrapper with scroll attributes', () => {
    // Arrange & Act
    render(<SidebarMenu />)

    // Assert
    const wrapper = screen.getByTestId('sidebar-menu-main').parentElement!.parentElement!
    expect(wrapper).toHaveAttribute('id', 'kt_app_sidebar_menu_wrapper')
    expect(wrapper).toHaveClass('app-sidebar-wrapper', 'hover-scroll-overlay-y', 'my-5')
    expect(wrapper).toHaveAttribute('data-kt-scroll', 'true')
    expect(wrapper).toHaveAttribute('data-kt-scroll-activate', 'true')
    expect(wrapper).toHaveAttribute('data-kt-scroll-height', 'auto')
    expect(wrapper).toHaveAttribute(
      'data-kt-scroll-dependencies',
      '#kt_app_sidebar_logo, #kt_app_sidebar_footer'
    )
    expect(wrapper).toHaveAttribute('data-kt-scroll-wrappers', '#kt_app_sidebar_menu')
    expect(wrapper).toHaveAttribute('data-kt-scroll-offset', '5px')
    expect(wrapper).toHaveAttribute('data-kt-scroll-save-state', 'true')
  })

  it('renders menu element with correct attributes', () => {
    // Arrange & Act
    render(<SidebarMenu />)

    // Assert
    const menu = screen.getByTestId('sidebar-menu-main').parentElement!
    expect(menu).toHaveClass('menu', 'menu-column', 'menu-rounded', 'menu-sub-indention', 'px-3')
    expect(menu).toHaveAttribute('id', '#kt_app_sidebar_menu')
    expect(menu).toHaveAttribute('data-kt-menu', 'true')
    expect(menu).toHaveAttribute('data-kt-menu-expand', 'false')
  })

  it('renders SidebarMenuMain component', () => {
    // Arrange & Act
    render(<SidebarMenu />)

    // Assert
    expect(screen.getByTestId('sidebar-menu-main')).toBeInTheDocument()
  })
})
