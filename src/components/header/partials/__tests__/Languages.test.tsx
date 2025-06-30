import { render, screen } from '@/utils/test-utils'

import { Languages } from '../languages'

// Mock dependencies
jest.mock('@/navigation', () => ({
  Link: ({ href, locale, className, children }: any) => (
    <a href={href} data-locale={locale} className={className}>
      {children}
    </a>
  ),
  usePathname: jest.fn(),
}))

const mockUsePathname = jest.mocked(require('@/navigation').usePathname)

// Mock location
const mockLocation = {
  pathname: '/en/dashboard',
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

describe('<Languages />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/dashboard')
    // Reset location pathname
    mockLocation.pathname = '/en/dashboard'
  })

  it('renders language menu container with correct attributes', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const menuItem = screen.getByText(/language/i).closest('.menu-item')
    expect(menuItem).toHaveClass('menu-item', 'px-5')
    expect(menuItem).toHaveAttribute('data-kt-menu-trigger', 'hover')
    expect(menuItem).toHaveAttribute('data-kt-menu-placement', 'left-start')
    expect(menuItem).toHaveAttribute('data-kt-menu-flip', 'bottom')
  })

  it('renders language menu link with correct structure', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const menuLink = screen.getByText(/language/i).closest('a')
    expect(menuLink).toHaveAttribute('href', '#')
    expect(menuLink).toHaveClass('menu-link', 'px-5')
  })

  it('displays current language name and flag', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const badge = document.querySelector('.fs-8.rounded.bg-light')
    expect(badge).toContainElement(screen.getAllByText('English')[0])
    const badgeFlag = badge!.querySelector('img')
    expect(badgeFlag).toHaveAttribute('alt', 'English')
    expect(badgeFlag).toHaveClass('w-15px', 'h-15px', 'rounded-1', 'ms-2')
  })

  it('displays Dutch when current language is Dutch', () => {
    // Arrange
    mockLocation.pathname = '/nl/dashboard'

    // Act
    render(<Languages />)

    // Assert
    const badge = document.querySelector('.fs-8.rounded.bg-light')
    expect(badge).toContainElement(screen.getAllByText('Dutch')[0])
    const badgeFlag = badge!.querySelector('img')
    expect(badgeFlag).toHaveAttribute('alt', 'Dutch')
  })

  it('renders language title with correct positioning classes', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const languageTitle = screen.getByText(/language/i)
    expect(languageTitle).toHaveClass('menu-title', 'position-relative')
  })

  it('renders current language badge with correct classes', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const badge = document.querySelector('.fs-8.rounded.bg-light')
    expect(badge).toHaveClass(
      'fs-8',
      'rounded',
      'bg-light',
      'px-3',
      'py-2',
      'position-absolute',
      'translate-middle-y',
      'top-50',
      'end-0'
    )
  })

  it('renders language submenu with correct structure', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const submenu = document.querySelector('.menu-sub.menu-sub-dropdown.w-175px.py-4')
    expect(submenu).toBeInTheDocument()
  })

  it('renders all language options in submenu', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const submenuLinks = document.querySelectorAll('.menu-sub .menu-link')
    expect(submenuLinks).toHaveLength(2)

    const dutchLink = Array.from(submenuLinks).find(
      link => link.getAttribute('data-locale') === 'nl'
    )
    const englishLink = Array.from(submenuLinks).find(
      link => link.getAttribute('data-locale') === 'en'
    )

    expect(dutchLink).toBeInTheDocument()
    expect(englishLink).toBeInTheDocument()
  })

  it('renders language links with correct attributes', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const submenuLinks = document.querySelectorAll('.menu-sub .menu-link')
    const dutchLink = Array.from(submenuLinks).find(
      link => link.getAttribute('data-locale') === 'nl'
    )
    const englishLink = Array.from(submenuLinks).find(
      link => link.getAttribute('data-locale') === 'en'
    )

    expect(dutchLink).toHaveAttribute('data-locale', 'nl')
    expect(dutchLink).toHaveAttribute('href', '/dashboard')
    expect(englishLink).toHaveAttribute('data-locale', 'en')
    expect(englishLink).toHaveAttribute('href', '/dashboard')
  })

  it('applies active class to current language', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const submenuLinks = document.querySelectorAll('.menu-sub .menu-link')
    const englishLink = Array.from(submenuLinks).find(
      link => link.getAttribute('data-locale') === 'en'
    )
    expect(englishLink).toHaveClass('active')
  })

  it('applies active class to Dutch when current language is Dutch', () => {
    // Arrange
    mockLocation.pathname = '/nl/dashboard'

    // Act
    render(<Languages />)

    // Assert
    const submenuLinks = document.querySelectorAll('.menu-sub .menu-link')
    const dutchLink = Array.from(submenuLinks).find(
      link => link.getAttribute('data-locale') === 'nl'
    )
    expect(dutchLink).toHaveClass('active')
  })

  it('renders language menu items with correct structure', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const menuItems = document.querySelectorAll('.menu-sub .menu-item')
    expect(menuItems).toHaveLength(2)

    menuItems.forEach(item => {
      expect(item).toHaveClass('menu-item', 'px-3')
    })
  })

  it('renders language links with correct classes', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const submenuLinks = document.querySelectorAll('.menu-sub .menu-link')

    submenuLinks.forEach(link => {
      expect(link).toHaveClass('menu-link', 'd-flex', 'px-5')
    })
  })

  it('renders flag symbols with correct classes', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const flagContainers = document.querySelectorAll('.symbol.symbol-20px.me-4')
    expect(flagContainers).toHaveLength(2) // Dutch and English flags

    const flags = document.querySelectorAll('.rounded-1')
    expect(flags.length).toBeGreaterThanOrEqual(2) // At least 2 flags (current + options)
  })

  it('handles invalid language path gracefully', () => {
    // Arrange
    mockLocation.pathname = '/invalid/dashboard'

    // Act
    render(<Languages />)

    // Assert
    // Should default to English and not crash
    const badge = document.querySelector('.fs-8.rounded.bg-light')
    expect(badge).toBeInTheDocument()
  })

  it('handles empty pathname gracefully', () => {
    // Arrange
    mockLocation.pathname = ''

    // Act
    render(<Languages />)

    // Assert
    // Should default to English and not crash
    const badge = document.querySelector('.fs-8.rounded.bg-light')
    expect(badge).toBeInTheDocument()
  })

  it('renders correct flag dimensions', () => {
    // Arrange & Act
    render(<Languages />)

    // Assert
    const badgeFlag = document.querySelector('.fs-8.rounded.bg-light img')
    expect(badgeFlag).toHaveAttribute('width', '15')
    expect(badgeFlag).toHaveAttribute('height', '15')
  })

  it('uses pathname from usePathname hook for links', () => {
    // Arrange
    mockUsePathname.mockReturnValue('/custom-path')

    // Act
    render(<Languages />)

    // Assert
    const submenuLinks = document.querySelectorAll('.menu-sub .menu-link')
    submenuLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/custom-path')
    })
  })
})
