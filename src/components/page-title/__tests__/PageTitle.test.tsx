import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { PageTitle } from '../PageTitle'
import { BreadcrumbItem } from '../types'

// Set up mocks
createCommonMocks()

describe('<PageTitle />', () => {
  it('renders title correctly', () => {
    // Arrange
    const title = 'Dashboard'

    // Act
    render(<PageTitle title={title} />)

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title)
  })

  it('renders title with description', () => {
    // Arrange
    const title = 'Dashboard'
    const description = 'Welcome to your dashboard'

    // Act
    render(<PageTitle title={title} description={description} />)

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders breadcrumbs when provided', () => {
    // Arrange
    const title = 'User Profile'
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Home', path: '/', isActive: false, isSeparator: false },
      { title: '', path: '', isActive: false, isSeparator: true },
      { title: 'Users', path: '/users', isActive: false, isSeparator: false },
      { title: '', path: '', isActive: false, isSeparator: true },
    ]

    // Act
    render(<PageTitle title={title} breadcrumbs={breadcrumbs} />)

    // Assert
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()

    // Check breadcrumb navigation
    const breadcrumbList = screen.getByRole('list')
    expect(breadcrumbList).toHaveClass('breadcrumb')
  })

  it('renders breadcrumb links correctly', () => {
    // Arrange
    const title = 'User Profile'
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Home', path: '/', isActive: false, isSeparator: false },
      { title: '', path: '', isActive: false, isSeparator: true },
      { title: 'Users', path: '/users', isActive: true, isSeparator: false },
    ]

    // Act
    render(<PageTitle title={title} breadcrumbs={breadcrumbs} />)

    // Assert
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')

    const usersLink = screen.getByRole('link', { name: 'Users' })
    expect(usersLink).toHaveAttribute('href', '/users')
  })

  it('renders separators in breadcrumbs', () => {
    // Arrange
    const title = 'User Profile'
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Home', path: '/', isActive: false, isSeparator: false },
      { title: '', path: '', isActive: false, isSeparator: true },
      { title: 'Users', path: '/users', isActive: false, isSeparator: false },
    ]

    // Act
    render(<PageTitle title={title} breadcrumbs={breadcrumbs} />)

    // Assert
    const separators = screen.getAllByRole('listitem')
    const separatorElement = separators.find(item => item.querySelector('.bullet'))
    expect(separatorElement).toBeInTheDocument()
  })

  it('does not render breadcrumbs when not provided', () => {
    // Arrange
    const title = 'Dashboard'

    // Act
    render(<PageTitle title={title} />)

    // Assert
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('does not render breadcrumbs when empty array is provided', () => {
    // Arrange
    const title = 'Dashboard'

    // Act
    render(<PageTitle title={title} breadcrumbs={[]} />)

    // Assert
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('applies correct CSS classes to title', () => {
    // Arrange
    const title = 'Dashboard'

    // Act
    render(<PageTitle title={title} />)

    // Assert
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('page-heading', 'd-flex', 'text-gray-900', 'fw-bold', 'fs-3')
  })

  it('applies correct CSS classes to description', () => {
    // Arrange
    const title = 'Dashboard'
    const description = 'Welcome to your dashboard'

    // Act
    render(<PageTitle title={title} description={description} />)

    // Assert
    const descriptionElement = screen.getByText(description)
    expect(descriptionElement).toHaveClass('page-desc', 'text-muted', 'fs-7', 'fw-semibold', 'pt-2')
  })

  it('adds current page title to breadcrumb trail', () => {
    // Arrange
    const title = 'User Profile'
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Home', path: '/', isActive: false, isSeparator: false },
    ]

    // Act
    render(<PageTitle title={title} breadcrumbs={breadcrumbs} />)

    // Assert
    const breadcrumbItems = screen.getAllByRole('listitem')
    const lastItem = breadcrumbItems[breadcrumbItems.length - 1]
    expect(lastItem).toHaveTextContent(title)
    expect(lastItem).toHaveClass('text-gray-900')
  })
})
