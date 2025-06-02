import { createCommonMocks, fireEvent, render, screen } from '@/utils/test-utils'

import { KTIcon } from '../KtIcon'

// Set up mocks
createCommonMocks()

// Mock icons
jest.mock('../icons', () => ({
  __esModule: true,
  default: {
    'test-icon': 3,
    'simple-icon': 1,
    'complex-icon': 5,
  },
}))

describe('<KTIcon />', () => {
  it('renders icon with default outline type', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" />)

    // Assert
    const icon = document.querySelector('i')
    expect(icon).toHaveClass('ki-outline', 'ki-test-icon')
  })

  it('renders icon with solid type', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" iconType="solid" />)

    // Assert
    const icon = document.querySelector('i')
    expect(icon).toHaveClass('ki-solid', 'ki-test-icon')
  })

  it('renders icon with duotone type', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" iconType="duotone" />)

    // Assert
    const icon = document.querySelector('i')
    expect(icon).toHaveClass('ki-duotone', 'ki-test-icon')
  })

  it('renders duotone icon with correct number of paths', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" iconType="duotone" />)

    // Assert
    const icon = document.querySelector('i')
    const paths = icon?.querySelectorAll('span')
    expect(paths).toHaveLength(3) // Based on mocked icons['test-icon'] = 3

    // Check path classes
    expect(paths?.[0]).toHaveClass('path1')
    expect(paths?.[1]).toHaveClass('path2')
    expect(paths?.[2]).toHaveClass('path3')
  })

  it('applies custom className', () => {
    // Arrange
    const customClass = 'custom-icon-class'

    // Act
    render(<KTIcon iconName="test-icon" className={customClass} />)

    // Assert
    const icon = document.querySelector('i')
    expect(icon).toHaveClass('ki-outline', 'ki-test-icon', customClass)
  })

  it('applies custom role', () => {
    // Arrange
    const customRole = 'button'

    // Act
    render(<KTIcon iconName="test-icon" role={customRole} />)

    // Assert
    const icon = screen.getByRole(customRole)
    expect(icon).toBeInTheDocument()
  })

  it('handles click events', () => {
    // Arrange
    const onClickMock = jest.fn()

    // Act
    render(<KTIcon iconName="test-icon" onClick={onClickMock} />)
    const icon = document.querySelector('i')
    if (icon) fireEvent.click(icon)

    // Assert
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('renders without className when not provided', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" />)

    // Assert
    const icon = document.querySelector('i')
    expect(icon?.className).toBe('ki-outline ki-test-icon')
  })

  it('renders duotone icon with single path', () => {
    // Arrange & Act
    render(<KTIcon iconName="simple-icon" iconType="duotone" />)

    // Assert
    const icon = document.querySelector('i')
    const paths = icon?.querySelectorAll('span')
    expect(paths).toHaveLength(1)
    expect(paths?.[0]).toHaveClass('path1')
  })

  it('renders duotone icon with multiple paths', () => {
    // Arrange & Act
    render(<KTIcon iconName="complex-icon" iconType="duotone" />)

    // Assert
    const icon = document.querySelector('i')
    const paths = icon?.querySelectorAll('span')
    expect(paths).toHaveLength(5)

    // Check all path classes
    for (let i = 0; i < 5; i++) {
      expect(paths?.[i]).toHaveClass(`path${i + 1}`)
    }
  })

  it('does not render paths for outline type', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" iconType="outline" />)

    // Assert
    const icon = document.querySelector('i')
    const paths = icon?.querySelectorAll('span')
    expect(paths).toHaveLength(0)
  })

  it('does not render paths for solid type', () => {
    // Arrange & Act
    render(<KTIcon iconName="test-icon" iconType="solid" />)

    // Assert
    const icon = document.querySelector('i')
    const paths = icon?.querySelectorAll('span')
    expect(paths).toHaveLength(0)
  })
})
