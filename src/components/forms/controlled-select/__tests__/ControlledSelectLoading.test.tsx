import React from 'react'

import { render, screen } from '@/utils/test-utils'

import { SelectLoading } from '../ControlledSelectLoading'

// Set up mocks

describe('SelectLoading Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading placeholder', () => {
    const { container } = render(React.createElement(SelectLoading))

    const placeholder = container.querySelector('.placeholder')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveClass('placeholder')
  })

  it('renders with correct styling', () => {
    const { container } = render(React.createElement(SelectLoading))

    const placeholderItem = container.querySelector('.placeholder-lg')
    expect(placeholderItem).toBeInTheDocument()
    expect(placeholderItem).toHaveClass('w-100', 'rounded', 'bg-gray-500')
    expect(placeholderItem).toHaveStyle('height: 38px')
  })
})
