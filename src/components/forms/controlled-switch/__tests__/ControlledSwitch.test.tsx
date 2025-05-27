import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { ControlledSwitch } from '../ControlledSwitch'

// Set up mocks
createCommonMocks()

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

describe('ControlledSwitch Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders switch with label', () => {
    render(
      <TestWrapper>
        <ControlledSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    )

    expect(screen.getByText('Test Switch')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('handles switch toggle', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <ControlledSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    )

    const switchElement = screen.getByRole('checkbox')
    expect(switchElement).not.toBeChecked()

    await user.click(switchElement)
    expect(switchElement).toBeChecked()
  })

  it('renders with initial checked state', () => {
    render(
      <TestWrapper defaultValues={{ testSwitch: true }}>
        <ControlledSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('renders without label', () => {
    render(
      <TestWrapper>
        <ControlledSwitch name="testSwitch" />
      </TestWrapper>
    )

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.queryByText('Test Switch')).not.toBeInTheDocument()
  })
})
