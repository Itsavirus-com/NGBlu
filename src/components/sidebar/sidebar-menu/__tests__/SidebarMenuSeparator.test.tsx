import { render, screen } from '@/utils/test-utils'

import { SidebarMenuSeparator } from '../SidebarMenuSeparator'

describe('<SidebarMenuSeparator />', () => {
  it('renders separator with correct structure', () => {
    // Arrange & Act
    render(<SidebarMenuSeparator title="Test Section" />)

    // Assert
    const menuItem = screen.getByText('Test Section').parentElement!.parentElement!
    expect(menuItem).toHaveClass('menu-item')
  })

  it('renders content wrapper with correct classes', () => {
    // Arrange & Act
    render(<SidebarMenuSeparator title="Test Section" />)

    // Assert
    const content = screen.getByText('Test Section').parentElement!
    expect(content).toHaveClass('menu-content', 'pt-8', 'pb-2')
  })

  it('renders title with correct classes', () => {
    // Arrange & Act
    render(<SidebarMenuSeparator title="Data Management" />)

    // Assert
    const title = screen.getByText('Data Management')
    expect(title).toHaveClass('menu-section', 'text-muted', 'text-uppercase', 'fs-8', 'ls-1')
  })

  it('displays the provided title text', () => {
    // Arrange & Act
    render(<SidebarMenuSeparator title="My Custom Section" />)

    // Assert
    expect(screen.getByText('My Custom Section')).toBeInTheDocument()
  })

  it('handles empty title', () => {
    // Arrange & Act
    const { container } = render(<SidebarMenuSeparator title="" />)

    // Assert
    const titleElement = container.querySelector('.menu-section')
    expect(titleElement).toHaveTextContent('')
  })

  it('handles special characters in title', () => {
    // Arrange & Act
    const specialTitle = 'Data & Settings - Config!'
    render(<SidebarMenuSeparator title={specialTitle} />)

    // Assert
    expect(screen.getByText(specialTitle)).toBeInTheDocument()
  })
})
