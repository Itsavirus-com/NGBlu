import { render, screen } from '@/utils/test-utils'

import { TableEmpty } from '../TableEmpty'

// Set up mocks

// Mock useTranslations
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      tableEmptyTitle: 'No data available',
      tableEmptyDescription: 'There are no records to display',
    }
    return translations[key] || key
  }),
}))

describe('<TableEmpty />', () => {
  it('renders empty state when visible is true', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableEmpty visible={true} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    expect(screen.getByText('No data available')).toBeInTheDocument()
    expect(screen.getByText('There are no records to display')).toBeInTheDocument()
    // Look for the actual icon element instead of mocked testid
    const icon = document.querySelector('i.ki-solid.ki-information-4')
    expect(icon).toBeInTheDocument()
  })

  it('does not render when visible is false', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableEmpty visible={false} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    expect(screen.queryByText('No data available')).not.toBeInTheDocument()
    expect(screen.queryByText('There are no records to display')).not.toBeInTheDocument()
  })

  it('sets correct colSpan when hasActions is false', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableEmpty visible={true} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    const cell = screen.getByRole('cell')
    expect(cell).toHaveAttribute('colSpan', '3')
  })

  it('sets correct colSpan when hasActions is true', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableEmpty visible={true} hasActions={true} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    const cell = screen.getByRole('cell')
    expect(cell).toHaveAttribute('colSpan', '4')
  })

  it('renders with correct CSS classes', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableEmpty visible={true} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    const cell = screen.getByRole('cell')
    expect(cell).toHaveClass('text-center')
  })
})
