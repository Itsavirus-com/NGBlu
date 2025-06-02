import { RenderOptions, render, waitFor, within } from '@testing-library/react'
import { PropsWithChildren, createContext } from 'react'

// Mock messages for next-intl
const messages = {
  // Add any translation keys used in your components
  common: {
    loading: 'Loading...',
    cancel: 'Cancel',
    yesContinue: 'Yes, continue',
    yes: 'Yes',
    no: 'No',
    submit: 'Submit',
    filter: 'Filter',
    filterOptions: 'Filter Options',
    reset: 'Reset',
    apply: 'Apply',
    edit: 'Edit',
    delete: 'Delete',
    deleteConfirmation: 'Are you sure you want to delete this item?',
    actions: 'Actions',
    tableEmptyTitle: 'No data available',
    tableEmptyDescription: 'There are no records to display',
    // Add other common translations
  },
}

// Create a mock NextIntl context
const MockIntlContext = createContext({
  locale: 'en',
  messages,
  timeZone: 'UTC',
  now: new Date(),
  formats: {},
})

// Mock NextIntl Provider component that provides the context
const MockNextIntlProvider = ({ children }: PropsWithChildren) => {
  return (
    <MockIntlContext.Provider
      value={{
        locale: 'en',
        messages,
        timeZone: 'UTC',
        now: new Date(),
        formats: {},
      }}
    >
      <div data-testid="test-wrapper">{children}</div>
    </MockIntlContext.Provider>
  )
}

// Create a custom render function that wraps components with necessary providers
const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <MockNextIntlProvider>{children}</MockNextIntlProvider>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything from testing library except the ones we override
export {
  act,
  cleanup,
  findAllByRole,
  findAllByText,
  findByAltText,
  findByDisplayValue,
  findByLabelText,
  findByRole,
  findByTestId,
  findByText,
  findByTitle,
  fireEvent,
  getAllByRole,
  getAllByText,
  getByAltText,
  getByDisplayValue,
  getByLabelText,
  getByRole,
  getByTestId,
  getByText,
  getByTitle,
  logRoles,
  prettyDOM,
  queryAllByRole,
  queryAllByText,
  queryByAltText,
  queryByDisplayValue,
  queryByLabelText,
  queryByRole,
  queryByTestId,
  queryByText,
  queryByTitle,
  renderHook,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'

// Export our custom render function and re-export waitFor, within
export { customRender as render, waitFor, within }

// Mock functions that can be reused across tests
export const createCommonMocks = () => {
  // Mock next-intl with proper context
  jest.mock('next-intl', () => ({
    useTranslations: jest.fn(() => (key: string) => {
      const keys = key.split('.')
      let value: any = messages
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    }),
    useLocale: jest.fn(() => 'en'),
  }))

  // Mock use-intl (used internally by next-intl)
  jest.mock('use-intl', () => ({
    useIntlContext: jest.fn(() => ({
      locale: 'en',
      messages,
      timeZone: 'UTC',
      now: new Date(),
      formats: {},
    })),
    useLocale: jest.fn(() => 'en'),
    useTranslations: jest.fn(() => (key: string) => {
      const keys = key.split('.')
      let value: any = messages
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    }),
  }))

  // Mock next/navigation
  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
      get: jest.fn(),
      toString: jest.fn(() => ''),
    })),
    usePathname: jest.fn(() => '/test-path'),
  }))

  // Mock next-intl/navigation
  jest.mock('next-intl/navigation', () => ({
    Link: jest.fn(({ children, href, ...props }) => (
      <a href={href} {...props}>
        {children}
      </a>
    )),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    })),
  }))

  // Mock react-hook-form
  jest.mock('react-hook-form', () => ({
    useFormContext: jest.fn(() => ({
      register: jest.fn(),
      formState: { errors: {}, isSubmitting: false },
      control: {},
    })),
    Controller: jest.fn(({ render }) => render({ field: {}, fieldState: {} })),
  }))

  // Mock IntersectionObserver
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Setup common mock responses that tests can override
export const setupMockResponses = () => {
  // Any common API response setups can go here
}
