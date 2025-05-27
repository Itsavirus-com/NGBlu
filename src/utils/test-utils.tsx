import { RenderOptions, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'

// Mock messages for next-intl
const messages = {
  // Add any translation keys used in your components
  common: {
    loading: 'Loading...',
    cancel: 'Cancel',
    yesContinue: 'Yes, continue',
    // Add other common translations
  },
}

// Create a wrapper component that includes all providers
const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <NextIntlClientProvider
      locale="en"
      messages={messages}
      timeZone="UTC"
      defaultTranslationValues={{}}
    >
      {children}
    </NextIntlClientProvider>
  )
}

// Custom render method that wraps the UI with all providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything except render
export { fireEvent, screen, waitFor, within }

// Override render method
export { customRender as render }

// Export providers for cases where you need to wrap multiple tests
export { AllTheProviders }

// Mock IntersectionObserver
const mockIntersectionObserver = () => {
  const observe = jest.fn()
  const unobserve = jest.fn()
  const disconnect = jest.fn()

  // @ts-ignore - we're deliberately mocking this
  window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect,
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: jest.fn(),
  }))

  return {
    observe,
    unobserve,
    disconnect,
  }
}

// Setup function to be called in beforeEach
export const setupTests = () => {
  mockIntersectionObserver()
  // Add other global mocks here
}

// Common mocks that can be reused across tests
export const commonMocks = {
  // Mock KTIcon component
  ktIcon: jest.fn(({ iconName, className }: { iconName: string; className?: string }) => (
    <i
      className={`ki-outline ki-${iconName}${className ? ' ' + className : ''}`}
      data-testid="mock-icon"
    >
      {iconName}
    </i>
  )),

  // Mock Link component from navigation
  link: jest.fn(
    ({
      href,
      children,
      className,
      onClick,
    }: {
      href: string
      children: React.ReactNode
      className?: string
      onClick?: () => void
    }) => (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  ),
}

// Helper to create jest.mock calls
export const createCommonMocks = () => {
  jest.mock('@/components/kt-icon/kt-icon', () => ({
    KTIcon: commonMocks.ktIcon,
  }))

  jest.mock('@/navigation', () => ({
    Link: commonMocks.link,
  }))

  // Mock next-intl hooks
  jest.mock('next-intl', () => ({
    ...jest.requireActual('next-intl'),
    useLocale: () => 'en',
  }))
}

// Add Jest specific setup
beforeEach(() => {
  setupTests()
})
