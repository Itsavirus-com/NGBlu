import { render, screen } from '@/utils/test-utils'

import { Navbar } from '../navbar'

// Mock child components
jest.mock('../partials/ThemeModeSwitcher', () => ({
  ThemeModeSwitcher: ({ toggleBtnClass }: { toggleBtnClass: string }) => (
    <div data-testid="theme-mode-switcher" data-class={toggleBtnClass}>
      ThemeModeSwitcher
    </div>
  ),
}))

jest.mock('../partials/HeaderUserMenu', () => ({
  HeaderUserMenu: () => <div data-testid="header-user-menu">HeaderUserMenu</div>,
}))

describe('<Navbar />', () => {
  it('renders navbar container with correct classes', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    const navbar = screen.getByTestId('theme-mode-switcher').parentElement!.parentElement!
    expect(navbar).toHaveClass('app-navbar', 'flex-shrink-0')
  })

  it('renders theme switcher with correct classes', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    const themeSwitcher = screen.getByTestId('theme-mode-switcher')
    expect(themeSwitcher).toBeInTheDocument()
    expect(themeSwitcher).toHaveAttribute('data-class', 'btn-active-light-primary btn-custom')

    const themeSwitcherContainer = themeSwitcher.parentElement!
    expect(themeSwitcherContainer).toHaveClass('app-navbar-item', 'ms-1', 'ms-md-4')
  })

  it('renders user avatar with correct attributes', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    const avatar = document.querySelector('img')
    expect(avatar).toHaveAttribute('alt', '')
    expect(avatar).toBeInTheDocument()
  })

  it('renders user avatar container with correct attributes', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    const avatarContainer = document.querySelector('img')!.parentElement!
    expect(avatarContainer).toHaveClass(
      'cursor-pointer',
      'symbol',
      'symbol-35px',
      'show',
      'menu-dropdown'
    )
    expect(avatarContainer).toHaveAttribute('data-kt-menu-trigger', "{default: 'click'}")
    expect(avatarContainer).toHaveAttribute('data-kt-menu-attach', 'parent')
    expect(avatarContainer).toHaveAttribute('data-kt-menu-placement', 'bottom-end')
  })

  it('renders user menu container with correct classes', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    const userMenuContainer = screen.getByTestId('header-user-menu').parentElement!
    expect(userMenuContainer).toHaveClass('app-navbar-item', 'ms-1', 'ms-md-4')
  })

  it('renders HeaderUserMenu component', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    expect(screen.getByTestId('header-user-menu')).toBeInTheDocument()
  })

  it('renders both navbar items', () => {
    // Arrange & Act
    render(<Navbar />)

    // Assert
    const navbar = screen.getByTestId('theme-mode-switcher').parentElement!.parentElement!
    const navbarItems = navbar.querySelectorAll('.app-navbar-item')

    expect(navbarItems).toHaveLength(2)
    expect(navbarItems[0]).toContainElement(screen.getByTestId('theme-mode-switcher'))
    expect(navbarItems[1]).toContainElement(document.querySelector('img')!)
    expect(navbarItems[1]).toContainElement(screen.getByTestId('header-user-menu'))
  })
})
