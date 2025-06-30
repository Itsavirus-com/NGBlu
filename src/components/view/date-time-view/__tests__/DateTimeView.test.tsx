import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'

import { DateTimeView } from '../DateTimeView'

describe('DateTimeView', () => {
  const mockDate = '2024-01-15 10:30:45'

  it('renders with basic props', () => {
    render(<DateTimeView value={mockDate} />)
    const expectedFormat = dayjs(mockDate).format('DD MMM YYYY HH:mm:ss')
    expect(screen.getByText(expectedFormat)).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<DateTimeView label="Test Date" value={mockDate} />)
    expect(screen.getByText('Test Date')).toBeInTheDocument()
    const expectedFormat = dayjs(mockDate).format('DD MMM YYYY HH:mm:ss')
    expect(screen.getByText(expectedFormat)).toBeInTheDocument()
  })

  it('renders different date formats', () => {
    const { rerender } = render(<DateTimeView value={mockDate} format="date" />)
    expect(screen.getByText('15 Jan 2024')).toBeInTheDocument()

    rerender(<DateTimeView value={mockDate} format="time" />)
    expect(screen.getByText('10:30:45')).toBeInTheDocument()

    rerender(<DateTimeView value={mockDate} format="date-short" />)
    expect(screen.getByText('15/01/2024')).toBeInTheDocument()
  })

  it('shows loading placeholder when isLoading is true', () => {
    render(<DateTimeView value={mockDate} isLoading />)
    expect(document.querySelector('.placeholder')).toBeInTheDocument()
    const expectedFormat = dayjs(mockDate).format('DD MMM YYYY HH:mm:ss')
    expect(screen.queryByText(expectedFormat)).not.toBeInTheDocument()
  })

  it('shows custom empty text for invalid date', () => {
    render(<DateTimeView value="invalid-date" customEmptyText="No date" />)
    expect(screen.getByText('No date')).toBeInTheDocument()
  })

  it('shows default empty text for empty value', () => {
    render(<DateTimeView value="" />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('renders without column wrapper when disableColumn is true', () => {
    const { container } = render(<DateTimeView value={mockDate} disableColumn />)
    expect(container.querySelector('[class*="col"]')).not.toBeInTheDocument()
    const expectedFormat = dayjs(mockDate).format('DD MMM YYYY HH:mm:ss')
    expect(screen.getByText(expectedFormat)).toBeInTheDocument()
  })

  it('renders with column wrapper by default', () => {
    const { container } = render(<DateTimeView value={mockDate} />)
    expect(container.querySelector('[class*="col"]')).toBeInTheDocument()
  })
})
