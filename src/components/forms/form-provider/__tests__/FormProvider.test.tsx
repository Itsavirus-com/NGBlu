import { createCommonMocks, fireEvent, render, screen } from '@/utils/test-utils'

import { FormProvider } from '../FormProvider'

// Set up mocks
createCommonMocks()

// Mock react-hook-form
const mockHandleSubmit = jest.fn()
const mockMethods = {
  handleSubmit: mockHandleSubmit,
  register: jest.fn(),
  formState: {
    errors: {},
    isDirty: false,
    isLoading: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isValid: true,
    isValidating: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    defaultValues: {},
    isSubmitting: false,
    disabled: {},
    validatingFields: {},
  },
  control: {},
  watch: jest.fn(),
  setValue: jest.fn(),
  getValues: jest.fn(),
  reset: jest.fn(),
  trigger: jest.fn(),
  clearErrors: jest.fn(),
  setError: jest.fn(),
  unregister: jest.fn(),
  getFieldState: jest.fn(),
  resetField: jest.fn(),
  setFocus: jest.fn(),
} as any

jest.mock('react-hook-form', () => ({
  FormProvider: jest.fn(({ children }) => <div data-testid="rhf-provider">{children}</div>),
}))

// Mock react-bootstrap Form
jest.mock('react-bootstrap', () => ({
  Form: jest.fn(({ children, onSubmit, 'data-test-id': testId }) => (
    <form onSubmit={onSubmit} data-testid={testId || 'form'}>
      {children}
    </form>
  )),
}))

describe('<FormProvider />', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockHandleSubmit.mockImplementation(fn => (e: any) => {
      e.preventDefault()
      fn({ testField: 'test value' })
    })
  })

  it('renders children correctly', () => {
    // Arrange
    const testContent = <div data-testid="test-content">Form Content</div>

    // Act
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        {testContent}
      </FormProvider>
    )

    // Assert
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Form Content')).toBeInTheDocument()
  })

  it('wraps content with react-hook-form Provider', () => {
    // Arrange & Act
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        <div>Content</div>
      </FormProvider>
    )

    // Assert
    expect(screen.getByTestId('rhf-provider')).toBeInTheDocument()
  })

  it('renders form with default test id', () => {
    // Arrange & Act
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        <div>Content</div>
      </FormProvider>
    )

    // Assert
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })

  it('renders form with custom test id when name is provided', () => {
    // Arrange
    const formName = 'user-registration'

    // Act
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit} name={formName}>
        <div>Content</div>
      </FormProvider>
    )

    // Assert
    expect(screen.getByTestId(`${formName}-form`)).toBeInTheDocument()
  })

  it('calls handleSubmit when form is submitted', () => {
    // Arrange
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        <button type="submit">Submit</button>
      </FormProvider>
    )

    // Act
    fireEvent.click(screen.getByText('Submit'))

    // Assert
    expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnSubmit)
  })

  it('calls onSubmit with form data when form is submitted', () => {
    // Arrange
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        <button type="submit">Submit</button>
      </FormProvider>
    )

    // Act
    fireEvent.click(screen.getByText('Submit'))

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledWith({ testField: 'test value' })
  })

  it('passes methods to react-hook-form Provider', () => {
    // Arrange
    const { FormProvider: RHFProvider } = require('react-hook-form')

    // Act
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        <div>Content</div>
      </FormProvider>
    )

    // Assert
    expect(RHFProvider).toHaveBeenCalledWith(
      expect.objectContaining(mockMethods),
      expect.anything()
    )
  })

  it('renders multiple children correctly', () => {
    // Arrange
    const children = (
      <>
        <input data-testid="input-1" />
        <input data-testid="input-2" />
        <button data-testid="submit-btn">Submit</button>
      </>
    )

    // Act
    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        {children}
      </FormProvider>
    )

    // Assert
    expect(screen.getByTestId('input-1')).toBeInTheDocument()
    expect(screen.getByTestId('input-2')).toBeInTheDocument()
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument()
  })

  it('handles form submission with preventDefault', () => {
    // Arrange
    const mockEvent = { preventDefault: jest.fn() }
    mockHandleSubmit.mockImplementation(fn => (e: any) => {
      e.preventDefault()
      fn({ testField: 'test value' })
    })

    render(
      <FormProvider methods={mockMethods} onSubmit={mockOnSubmit}>
        <button type="submit">Submit</button>
      </FormProvider>
    )

    // Act
    const form = screen.getByTestId('form')
    fireEvent.submit(form, mockEvent)

    // Assert
    expect(mockOnSubmit).toHaveBeenCalled()
  })
})
