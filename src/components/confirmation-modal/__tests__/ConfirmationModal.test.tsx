import userEvent from '@testing-library/user-event'

import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { ConfirmationModalProps } from '../confirmation-modal.type'
import { ConfirmationModal } from '../ConfirmationModal'

// Set up mocks
createCommonMocks()

describe('<ConfirmationModal />', () => {
  const defaultProps: ConfirmationModalProps = {
    title: 'Confirm Action',
    body: 'Are you sure you want to proceed?',
    visible: true,
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders modal with title and body when visible', () => {
    render(<ConfirmationModal {...defaultProps} />)

    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument()
    expect(screen.getByText('Yes, continue')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('does not render when visible is false', () => {
    render(<ConfirmationModal {...defaultProps} visible={false} />)

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(document.querySelector('.spinner-border')).toBeInTheDocument()
    expect(screen.queryByText('Yes, continue')).not.toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup()
    const onConfirmMock = jest.fn()

    render(<ConfirmationModal {...defaultProps} onConfirm={onConfirmMock} />)
    await user.click(screen.getByText('Yes, continue'))

    expect(onConfirmMock).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const onCancelMock = jest.fn()

    render(<ConfirmationModal {...defaultProps} onCancel={onCancelMock} />)
    await user.click(screen.getByText('Cancel'))

    expect(onCancelMock).toHaveBeenCalledTimes(1)
  })

  it('renders with custom labels and variant', () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        cancelLabel="No, go back"
        confirmLabel="Yes, delete"
        variant="danger"
      />
    )

    expect(screen.getByText('Yes, delete')).toBeInTheDocument()
    expect(screen.getByText('No, go back')).toBeInTheDocument()
    expect(document.querySelector('.modal-header')).toHaveClass('bg-danger')
  })
})
