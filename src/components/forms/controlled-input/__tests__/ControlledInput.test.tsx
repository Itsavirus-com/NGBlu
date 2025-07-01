import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { render, screen } from '@/utils/test-utils'

import { ControlledInput } from '../ControlledInput'

// Set up mocks

// Test wrapper component
const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: ReactNode
  defaultValues?: any
}) => {
  const methods = useForm({ defaultValues })
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('ControlledInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders input with label', () => {
    render(
      <TestWrapper>
        <ControlledInput name="testInput" label="Test Input" />
      </TestWrapper>
    )

    expect(screen.getByText('Test Input')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('handles text input', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <ControlledInput name="testInput" label="Test Input" />
      </TestWrapper>
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('renders password field with toggle', () => {
    render(
      <TestWrapper>
        <ControlledInput name="password" label="Password" type="password" />
      </TestWrapper>
    )

    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByAltText('Show password')).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <ControlledInput name="password" label="Password" type="password" />
      </TestWrapper>
    )

    const toggleButton = screen.getByAltText('Show password')

    await user.click(toggleButton)
    expect(screen.getByAltText('Hide password')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(
      <TestWrapper>
        <ControlledInput name="testInput" />
      </TestWrapper>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.queryByText('Test Input')).not.toBeInTheDocument()
  })
})
