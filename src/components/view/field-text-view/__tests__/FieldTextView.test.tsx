import { render, screen } from '@testing-library/react'

import { FieldTextView } from '../FieldTextView'

// Mock the TextView component
jest.mock('@/components/view/text-view/TextView', () => ({
  TextView: ({ label, value, isLoading, className, ...props }: any) => (
    <div data-testid="text-view" data-loading={isLoading} className={className} {...props}>
      {label}: {value}
    </div>
  ),
}))

// Mock the Page component
jest.mock('@/components/page/page', () => ({
  Page: ({ title, className, children }: any) => (
    <div data-testid="page" data-title={title} className={className}>
      {children}
    </div>
  ),
}))

describe('FieldTextView', () => {
  const mockFields = [
    {
      label: 'Name',
      value: 'John Doe',
    },
    {
      label: 'Email',
      value: 'john@example.com',
    },
  ]

  const defaultProps = {
    isLoading: false,
    fields: mockFields,
    translation: 'common',
  }

  it('renders without crashing', () => {
    render(<FieldTextView {...defaultProps} />)

    expect(screen.getByTestId('page')).toBeInTheDocument()
  })

  it('renders with title when provided', () => {
    render(<FieldTextView {...defaultProps} title="User Details" />)

    const page = screen.getByTestId('page')
    expect(page).toHaveAttribute('data-title', 'User Details')
  })

  it('renders without title when not provided', () => {
    render(<FieldTextView {...defaultProps} />)

    const page = screen.getByTestId('page')
    expect(page).toHaveAttribute('data-title', '')
  })

  it('renders all fields correctly', () => {
    render(<FieldTextView {...defaultProps} />)

    const textViews = screen.getAllByTestId('text-view')
    expect(textViews).toHaveLength(2)

    expect(textViews[0]).toHaveTextContent('Name: John Doe')
    expect(textViews[1]).toHaveTextContent('Email: john@example.com')
  })

  it('passes loading state to TextView components', () => {
    render(<FieldTextView {...defaultProps} isLoading={true} />)

    const textViews = screen.getAllByTestId('text-view')
    textViews.forEach(textView => {
      expect(textView).toHaveAttribute('data-loading', 'true')
    })
  })

  it('applies correct styling classes', () => {
    render(<FieldTextView {...defaultProps} />)

    const page = screen.getByTestId('page')
    expect(page).toHaveClass('pt-5')

    const textViews = screen.getAllByTestId('text-view')
    textViews.forEach(textView => {
      expect(textView).toHaveClass('my-3')
    })
  })

  it('renders children when provided', () => {
    render(
      <FieldTextView {...defaultProps}>
        <div data-testid="child-content">Additional content</div>
      </FieldTextView>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByTestId('child-content')).toHaveTextContent('Additional content')
  })

  it('handles empty fields array', () => {
    render(<FieldTextView {...defaultProps} fields={[]} />)

    expect(screen.getByTestId('page')).toBeInTheDocument()
    expect(screen.queryAllByTestId('text-view')).toHaveLength(0)
  })

  it('passes additional props to TextView components', () => {
    const fieldsWithProps = [
      {
        label: 'Status',
        value: 'Active',
        'data-status': 'enabled',
      },
    ]

    render(<FieldTextView {...defaultProps} fields={fieldsWithProps} />)

    const textView = screen.getByTestId('text-view')
    expect(textView).toHaveAttribute('data-status', 'enabled')
  })
})
