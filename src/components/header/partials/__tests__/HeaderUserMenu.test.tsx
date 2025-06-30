import { signOut } from 'next-auth/react'

import { fireEvent, render, screen } from '@/utils/test-utils'

import { HeaderUserMenu } from '../HeaderUserMenu'

// Mock dependencies
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock('@/utils/password-verification', () => ({
  passwordVerificationUtils: {
    clearVerification: jest.fn(),
  },
}))

jest.mock('../languages', () => ({
  Languages: () => <div data-testid="languages">Languages</div>,
}))

const mockUseSession = jest.mocked(require('next-auth/react').useSession)
const mockSignOut = jest.mocked(signOut)
const mockClearVerification = jest.mocked(
  require('@/utils/password-verification').passwordVerificationUtils.clearVerification
)

describe('<HeaderUserMenu />', () => {
  const mockSession = {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders menu container with correct attributes', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const menu = screen.getByRole('img').closest('.menu')
    expect(menu).toHaveClass(
      'menu',
      'menu-sub',
      'menu-sub-dropdown',
      'menu-column',
      'menu-rounded',
      'menu-gray-600',
      'menu-state-bg',
      'menu-state-primary',
      'fw-bold',
      'py-4',
      'fs-6',
      'w-275px'
    )
    expect(menu).toHaveAttribute('data-kt-menu', 'true')
  })

  it('renders user avatar with correct attributes', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const avatar = screen.getByRole('img')
    expect(avatar).toHaveAttribute('alt', 'Logo')
    expect(avatar).toBeInTheDocument()

    const avatarContainer = avatar.parentElement!
    expect(avatarContainer).toHaveClass('symbol', 'symbol-50px', 'me-5')
  })

  it('displays user name when session exists', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toHaveClass(
      'fw-bolder',
      'd-flex',
      'align-items-center',
      'fs-5'
    )
  })

  it('displays user email when session exists', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const emailLink = screen.getByText('john.doe@example.com')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveClass(
      'fw-bold',
      'text-muted',
      'text-hover-primary',
      'fs-7',
      'text-truncate',
      'd-block'
    )
    expect(emailLink).toHaveAttribute('href', '#')
    expect(emailLink).toHaveStyle({ maxWidth: '180px' })
  })

  it('handles null session gracefully', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    // Should not crash and should render the menu structure
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByTestId('languages')).toBeInTheDocument()
  })

  it('renders Languages component', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    expect(screen.getByTestId('languages')).toBeInTheDocument()
  })

  it('renders account settings link with correct attributes', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const accountSettingsLink = screen.getByRole('link', { name: /account_settings/i })
    expect(accountSettingsLink).toHaveAttribute('href', '/dashboard/account-profile-settings')
    expect(accountSettingsLink).toHaveClass('menu-link', 'px-5')

    const accountSettingsContainer = accountSettingsLink.parentElement!
    expect(accountSettingsContainer).toHaveClass('menu-item', 'px-5', 'my-1')
  })

  it('renders sign out button with correct attributes', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const signOutButton = screen.getByText(/sign_out/i)
    expect(signOutButton).toHaveClass('menu-link', 'px-5')

    const signOutContainer = signOutButton.parentElement!
    expect(signOutContainer).toHaveClass('menu-item', 'px-5')
    expect(signOutContainer).toHaveAttribute('data-kt-menu-trigger', 'click')
  })

  it('calls signOut and clearVerification when sign out is clicked', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })
    render(<HeaderUserMenu />)

    // Act
    const signOutButton = screen.getByText(/sign_out/i)
    fireEvent.click(signOutButton)

    // Assert
    expect(mockClearVerification).toHaveBeenCalledTimes(1)
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  it('renders separator between user info and content', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const separator = document.querySelector('.separator.my-2')
    expect(separator).toBeInTheDocument()
  })

  it('renders user info section with correct structure', () => {
    // Arrange
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    const userInfoSection = screen.getByText('John Doe').closest('.menu-item')
    expect(userInfoSection).toHaveClass('menu-item', 'px-3')

    const userInfoContent = userInfoSection!.querySelector('.menu-content')
    expect(userInfoContent).toHaveClass('menu-content', 'd-flex', 'align-items-center', 'px-3')

    const userDetails = userInfoContent!.querySelector('.d-flex.flex-column')
    expect(userDetails).toBeInTheDocument()
  })

  it('handles session with missing user data', () => {
    // Arrange
    mockUseSession.mockReturnValue({
      data: { user: {} },
      status: 'authenticated',
    })

    // Act
    render(<HeaderUserMenu />)

    // Assert
    // Should not crash and should render the menu structure
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByTestId('languages')).toBeInTheDocument()
  })
})
