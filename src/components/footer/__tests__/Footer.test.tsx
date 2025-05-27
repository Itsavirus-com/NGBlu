import React from 'react'

import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { Footer } from '../Footer'

// Set up mocks
createCommonMocks()

describe('<Footer />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders footer with current year and company link', () => {
    render(React.createElement(Footer))

    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(`${currentYear}©`, { exact: false })).toBeInTheDocument()
    expect(screen.getByText('ngblu networks')).toBeInTheDocument()
  })

  it('has correct company link attributes', () => {
    render(React.createElement(Footer))

    const companyLink = screen.getByRole('link', { name: 'ngblu networks' })
    expect(companyLink).toHaveAttribute('href', 'https://www.ngblunetworks.nl/')
    expect(companyLink).toHaveAttribute('target', '_blank')
  })

  it('has correct footer structure and classes', () => {
    render(React.createElement(Footer))

    const footer = document.getElementById('kt_app_footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('app-footer')
  })
})
