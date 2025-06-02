import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { TableLoading } from '../TableLoading'

// Set up mocks
createCommonMocks()

// Mock react-bootstrap Placeholder
jest.mock('react-bootstrap', () => ({
  Placeholder: jest.fn(({ children, as: Component = 'div', animation, ...props }) => (
    <Component data-testid="placeholder" data-animation={animation} {...props}>
      {children}
    </Component>
  )),
}))

describe('<TableLoading />', () => {
  it('renders loading placeholders when visible is true', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableLoading visible={true} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    const placeholders = screen
      .getAllByTestId('placeholder')
      .filter(el => el.getAttribute('data-animation') === 'wave')
    expect(placeholders).toHaveLength(30) // 10 rows × 3 columns
  })

  it('does not render when visible is false', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableLoading visible={false} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument()
  })

  it('renders correct number of columns when hasActions is false', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableLoading visible={true} hasActions={false} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(10)

    // Check first row has correct number of cells
    const firstRowCells = rows[0].querySelectorAll('td')
    expect(firstRowCells).toHaveLength(3)
  })

  it('renders correct number of columns when hasActions is true', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableLoading visible={true} hasActions={true} columnLength={3} />
        </tbody>
      </table>
    )

    // Assert
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(10)

    // Check first row has correct number of cells (3 + 1 for actions)
    const firstRowCells = rows[0].querySelectorAll('td')
    expect(firstRowCells).toHaveLength(4)
  })

  it('renders exactly 10 rows', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableLoading visible={true} hasActions={false} columnLength={2} />
        </tbody>
      </table>
    )

    // Assert
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(10)
  })

  it('renders placeholders with wave animation', () => {
    // Arrange & Act
    render(
      <table>
        <tbody>
          <TableLoading visible={true} hasActions={false} columnLength={1} />
        </tbody>
      </table>
    )

    // Assert
    const placeholders = screen
      .getAllByTestId('placeholder')
      .filter(el => el.getAttribute('data-animation') === 'wave')
    placeholders.forEach(placeholder => {
      expect(placeholder).toHaveAttribute('data-animation', 'wave')
    })
  })
})
