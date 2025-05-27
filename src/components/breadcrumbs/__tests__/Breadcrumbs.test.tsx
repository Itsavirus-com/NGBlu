import userEvent from '@testing-library/user-event'

import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { Breadcrumbs } from '../Breadcrumbs'
import { BreadcrumbItem } from '../breadcrumbs.type'

// Set up mocks
createCommonMocks()

// Mock the helper functions
jest.mock('../helper', () => ({
  mapApiPathToAppRoute: jest.fn(path => {
    if (path.includes('enterprise-roots')) return '/dashboard/enterprise-roots/123'
    return '/dashboard/default'
  }),
}))

jest.mock('@/app/[locale]/dashboard/(data-validation)/data-hierarchy/_components/helper', () => ({
  generateItemIcon: jest.fn(() => 'crown'),
}))

// Mock the navigation hook
const mockPush = jest.fn()
jest.mock('@/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('<Breadcrumbs />', () => {
  const multipleItems: BreadcrumbItem[] = [
    { name: 'Enterprise Root', path: '/api/enterprise-roots/123', type: 'enterprise-root' },
    { name: 'Business Partner', path: '/api/business-partners/456', type: 'business-partner' },
    { name: 'Project Alpha', path: '/api/projects/789', type: 'project' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders null when items is null or not an array', () => {
    const { container: nullContainer } = render(<Breadcrumbs items={null as any} />)
    expect(nullContainer.firstChild).toBeNull()

    const { container: invalidContainer } = render(<Breadcrumbs items={'invalid' as any} />)
    expect(invalidContainer.firstChild).toBeNull()
  })

  it('renders breadcrumb items correctly', () => {
    render(<Breadcrumbs items={multipleItems} />)

    expect(screen.getByText('Enterprise Root')).toBeInTheDocument()
    expect(screen.getByText('Business Partner')).toBeInTheDocument()
    expect(screen.getByText('Project Alpha')).toBeInTheDocument()
  })

  it('marks last item as active', () => {
    render(<Breadcrumbs items={multipleItems} />)

    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems[2]).toHaveClass('active')
    expect(breadcrumbItems[0]).not.toHaveClass('active')
  })

  it('handles click on non-last item with callback', async () => {
    const user = userEvent.setup()
    const onBreadcrumbPress = jest.fn()

    render(<Breadcrumbs items={multipleItems} onBreadcrumbPress={onBreadcrumbPress} />)
    await user.click(screen.getByText('Enterprise Root'))

    expect(onBreadcrumbPress).toHaveBeenCalledWith(multipleItems[0])
    expect(mockPush).toHaveBeenCalledWith('/dashboard/enterprise-roots/123')
  })

  it('handles click on non-last item without callback', async () => {
    const user = userEvent.setup()

    render(<Breadcrumbs items={multipleItems} />)
    await user.click(screen.getByText('Enterprise Root'))

    expect(mockPush).toHaveBeenCalledWith('/dashboard/enterprise-roots/123')
  })

  it('does not handle click on last item', async () => {
    const user = userEvent.setup()
    const onBreadcrumbPress = jest.fn()

    render(<Breadcrumbs items={multipleItems} onBreadcrumbPress={onBreadcrumbPress} />)
    await user.click(screen.getByText('Project Alpha'))

    expect(onBreadcrumbPress).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('handles empty items array', () => {
    render(<Breadcrumbs items={[]} />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
