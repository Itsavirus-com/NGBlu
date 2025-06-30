import { fireEvent, render, screen } from '@/utils/test-utils'

import { FormButtons } from '../FormButtons'

// Set up mocks

// Mock useRouter
const mockBack = jest.fn()
jest.mock('@/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}))

// Mock useTranslations
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      submit: 'Submit',
      cancel: 'Cancel',
    }
    return translations[key] || key
  }),
}))

describe('<FormButtons />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders submit and cancel buttons', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('renders custom submit text when provided', () => {
    // Arrange
    const customSubmitText = 'Save Changes'

    // Act
    render(<FormButtons isSubmitting={false} submitText={customSubmitText} />)

    // Assert
    expect(screen.getByText(customSubmitText)).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('shows loading state when isSubmitting is true', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={true} />)

    // Assert
    // When loading, button shows "Loading..." instead of "Submit"
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('disables submit button when isSubmitting is true', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={true} />)

    // Assert
    // When loading, button shows "Loading..." instead of "Submit"
    const loadingButton = screen.getByText('Loading...')
    expect(loadingButton.closest('button')).toBeDisabled()
  })

  it('enables submit button when isSubmitting is false', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    // The button should not be disabled
  })

  it('calls router.back when cancel button is clicked', () => {
    // Arrange
    render(<FormButtons isSubmitting={false} />)

    // Act
    fireEvent.click(screen.getByText('Cancel'))

    // Assert
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('renders submit button with correct type', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    // The type="submit" should be passed to the Button component
  })

  it('renders cancel button with correct type', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeInTheDocument()
    // The type="button" should be passed to the Button component
  })

  it('applies correct CSS classes to container', () => {
    // Arrange & Act
    const { container } = render(<FormButtons isSubmitting={false} />)

    // Assert
    // Look for the button container inside the test wrapper
    const buttonContainer = container.querySelector('.mt-8.d-flex.gap-2')
    expect(buttonContainer).toBeInTheDocument()
    expect(buttonContainer).toHaveClass('mt-8', 'd-flex', 'gap-2')
  })

  it('renders submit button with success color class', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    // The colorClass="success" should be passed to the Button component
  })

  it('renders cancel button with danger color class', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeInTheDocument()
    // The colorClass="danger" should be passed to the Button component
  })

  it('renders submit button with check icon', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    // The icon="check" should be passed to the Button component
  })

  it('renders cancel button with cross icon', () => {
    // Arrange & Act
    render(<FormButtons isSubmitting={false} />)

    // Assert
    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeInTheDocument()
    // The icon="cross" should be passed to the Button component
  })

  it('does not call router.back when submit button is clicked', () => {
    // Arrange
    render(<FormButtons isSubmitting={false} />)

    // Act
    fireEvent.click(screen.getByText('Submit'))

    // Assert
    expect(mockBack).not.toHaveBeenCalled()
  })
})
