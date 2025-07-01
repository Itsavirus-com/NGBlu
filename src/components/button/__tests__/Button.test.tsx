import { fireEvent, render, screen } from '@/utils/test-utils'

import { Button } from '../button'

describe('<Button />', () => {
  it('renders button with label correctly', () => {
    // Arrange
    const label = 'Click me'

    // Act
    render(<Button label={label} />)

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('triggers onClick when clicked', () => {
    // Arrange
    const onClickMock = jest.fn()
    render(<Button label="Submit" onClick={onClickMock} />)

    // Act
    fireEvent.click(screen.getByText('Submit'))

    // Assert
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('displays loading state correctly', () => {
    // Arrange
    const label = 'Submit'

    // Act
    render(<Button label={label} loading />)

    // Assert
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText(label)).not.toBeInTheDocument()
  })

  it('renders as link when href is provided', () => {
    // Arrange
    const href = 'en/test-page'
    const label = 'Go to page'

    // Act
    render(<Button href={href} label={label} />)

    // Assert
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', href)
    expect(link).toHaveTextContent(label)
  })

  it('applies custom className correctly', () => {
    // Arrange
    const customClass = 'custom-button-class'

    // Act
    render(<Button label="Custom" className={customClass} />)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveClass(customClass)
  })

  it('renders in disabled state', () => {
    // Arrange
    const onClickMock = jest.fn()

    // Act
    render(<Button label="Disabled" disabled onClick={onClickMock} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert
    expect(button).toBeDisabled()
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('renders with icon and label', () => {
    // Arrange
    const label = 'Save'
    const icon = 'check'

    // Act
    render(<Button label={label} icon={icon} />)

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument()
    const iconElement = document.querySelector('.ki-outline.ki-check')
    expect(iconElement).toBeInTheDocument()
  })

  it('shows only spinner without text in onlyIconLoading mode', () => {
    // Arrange
    const label = 'Save'

    // Act
    render(<Button label={label} loading onlyIconLoading />)

    // Assert
    expect(screen.queryByText(label)).not.toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    const spinner = document.querySelector('.spinner-border')
    expect(spinner).toBeInTheDocument()
  })
})
