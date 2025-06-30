import { fireEvent, render, screen, waitFor } from '@/utils/test-utils'

import { Action } from '../table-actions.type'
import { TableActions, TableActionsHead } from '../TableActions'

// Set up mocks

// Mock hooks and services
jest.mock('@/hooks/use-toast.hook', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}))

jest.mock('@/services/api/general-api', () => ({
  generalApi: {
    deleteItem: jest.fn(),
  },
}))

// Mock ConfirmationModal
jest.mock('../../confirmation-modal/ConfirmationModal', () => ({
  ConfirmationModal: jest.fn(({ visible, onConfirm, onCancel, children }) =>
    visible ? (
      <div data-testid="confirmation-modal">
        {children}
        <button onClick={onConfirm} data-testid="confirm-button">
          Confirm
        </button>
        <button onClick={onCancel} data-testid="cancel-button">
          Cancel
        </button>
      </div>
    ) : null
  ),
}))

// Mock react-bootstrap components
jest.mock('react-bootstrap', () => ({
  OverlayTrigger: jest.fn(({ children }) => children),
  Tooltip: jest.fn(({ children }) => <div>{children}</div>),
}))

// Mock useTranslations
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      deleteConfirmation: 'Are you sure you want to delete this item?',
    }
    return translations[key] || key
  }),
}))

describe('<TableActionsHead />', () => {
  it('renders actions header when actions are provided', () => {
    // Arrange
    const actions: Action[] = ['edit', 'delete']

    // Act
    render(
      <table>
        <thead>
          <tr>
            <TableActionsHead actions={actions} />
          </tr>
        </thead>
      </table>
    )

    // Assert
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders actions header when custom actions are provided', () => {
    // Arrange
    const customActions = [{ label: 'Custom Action' }]

    // Act
    render(
      <table>
        <thead>
          <tr>
            <TableActionsHead customActions={customActions} />
          </tr>
        </thead>
      </table>
    )

    // Assert
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('does not render when no actions are provided', () => {
    // Arrange & Act
    render(
      <table>
        <thead>
          <tr>
            <TableActionsHead actions={[]} customActions={[]} />
          </tr>
        </thead>
      </table>
    )

    // Assert
    expect(screen.queryByText('Actions')).not.toBeInTheDocument()
  })
})

describe('<TableActions />', () => {
  const defaultProps = {
    dataId: 123,
    apiPath: '/api/items',
    rowData: { id: '123', name: 'Test Item' },
  }

  const mockRow = { id: '123', name: 'Test Item' }

  it('renders edit action when edit is in actions array', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <tr>
            <TableActions {...defaultProps} actions={['edit']} actionBasePath="/items" />
          </tr>
        </tbody>
      </table>
    )

    // Assert - Check for edit link by href since it has no accessible name
    const editLink = screen.getByRole('link')
    expect(editLink).toHaveAttribute('href', '/items/123/edit')
  })

  it('renders delete action when delete is in actions array', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <tr>
            <TableActions actions={['delete']} rowData={mockRow} />
          </tr>
        </tbody>
      </table>
    )

    // Assert
    // Look for the delete button by its icon class instead of text
    const deleteButton = document.querySelector('button i.ki-trash')
    expect(deleteButton).toBeInTheDocument()
  })

  it('renders custom actions when provided', () => {
    // Arrange
    const customActions = [{ label: 'Custom Action 1' }, { label: 'Custom Action 2' }]

    // Act
    render(
      <table>
        <tbody>
          <tr>
            <TableActions {...defaultProps} customActions={customActions} />
          </tr>
        </tbody>
      </table>
    )

    // Assert
    expect(screen.getByText('Custom Action 1')).toBeInTheDocument()
    expect(screen.getByText('Custom Action 2')).toBeInTheDocument()
  })

  it('shows confirmation modal when delete is clicked', async () => {
    // Arrange
    render(
      <table>
        <tbody>
          <tr>
            <TableActions actions={['delete']} rowData={mockRow} />
          </tr>
        </tbody>
      </table>
    )

    // Act
    const deleteButton = document.querySelector('button i.ki-trash')?.parentElement
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton!)

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument()
    })
  })

  it('calls onDelete when custom delete handler is provided', async () => {
    // Arrange
    const onDelete = jest.fn()

    render(
      <table>
        <tbody>
          <tr>
            <TableActions actions={['delete']} rowData={mockRow} onDelete={onDelete} />
          </tr>
        </tbody>
      </table>
    )

    // Act
    const deleteButton = document.querySelector('button i.ki-trash')?.parentElement
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton!)
    await waitFor(() => {
      expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument()
    })

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    fireEvent.click(confirmButton)

    // Assert
    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(mockRow, undefined)
    })
  })

  it('does not render when no actions are provided', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <tr>
            <TableActions {...defaultProps} actions={[]} customActions={[]} />
          </tr>
        </tbody>
      </table>
    )

    // Assert
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })
})
