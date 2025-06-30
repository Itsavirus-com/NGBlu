import '@testing-library/jest-dom'
import { ImageProps } from 'next/image'
import React from 'react'

// Mock next-intl/navigation functions
jest.mock('next-intl/navigation', () => ({
  createSharedPathnamesNavigation: jest.fn(() => ({
    Link: jest.fn(({ children, href, className, ...props }) =>
      React.createElement('a', { href, className, ...props }, children)
    ),
    redirect: jest.fn(),
    usePathname: jest.fn(() => '/test-path'),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    })),
  })),
  Link: jest.fn(({ children, href, className, ...props }) =>
    React.createElement('a', { href, className, ...props }, children)
  ),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}))

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps): JSX.Element => {
    return React.createElement('img', props)
  },
}))

// Mock messages for next-intl
const mockMessages = {
  common: {
    loading: 'Loading...',
    cancel: 'Cancel',
    yesContinue: 'Yes, continue',
    yes: 'Yes',
    no: 'No',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    deleteConfirmation: 'Are you sure you want to delete this item?',
    actions: 'Actions',
    tableEmptyTitle: 'No data available',
    tableEmptyDescription: 'There are no records to display',
    table: {
      filter: 'Filter',
      filterOptions: 'Filter Options',
      reset: 'Reset',
      apply: 'Apply',
    },
  },
}

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const keys = key.split('.')
    let value: any = mockMessages
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }),
  useLocale: jest.fn(() => 'en'),
  NextIntlClientProvider: jest.fn(({ children }) => children),
}))

// Mock use-intl (used internally by next-intl)
jest.mock('use-intl', () => ({
  useIntlContext: jest.fn(() => ({
    locale: 'en',
    messages: mockMessages,
    timeZone: 'UTC',
    now: new Date(),
    formats: {},
  })),
  useLocale: jest.fn(() => 'en'),
  useTranslations: jest.fn(() => (key: string) => {
    const keys = key.split('.')
    let value: any = mockMessages
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

// Mock react-hook-form
jest.mock('react-hook-form', () => {
  // Store form state across the mock
  let mockFormState = { errors: {}, isSubmitting: false }
  let mockDefaultValues = {}

  return {
    useFormContext: jest.fn(() => ({
      register: jest.fn(() => ({
        onChange: jest.fn(),
        onBlur: jest.fn(),
        name: 'test',
        ref: jest.fn(),
      })),
      formState: mockFormState,
      control: { _defaultValues: mockDefaultValues },
      setValue: jest.fn(),
      getValues: jest.fn(() => ({})),
      watch: jest.fn(),
    })),
    Controller: jest.fn(({ render: renderProp }) =>
      renderProp({
        field: {
          onChange: jest.fn(),
          onBlur: jest.fn(),
          value: '',
          name: 'test',
          ref: jest.fn(),
        },
        fieldState: { error: undefined },
        formState: mockFormState,
      })
    ),
    useController: jest.fn(({ control, name }) => {
      const defaultValues = control?._defaultValues || {}
      const fieldValue = defaultValues[name]

      return {
        field: {
          onChange: jest.fn(),
          onBlur: jest.fn(),
          value: fieldValue !== undefined ? fieldValue : false,
          name: name || 'test',
          ref: jest.fn(),
        },
        fieldState: { error: undefined },
        formState: mockFormState,
      }
    }),
    FormProvider: jest.fn(({ children }) =>
      React.createElement('div', { 'data-testid': 'form-provider' }, children)
    ),
    useForm: jest.fn((options = {}) => {
      mockDefaultValues = options.defaultValues || {}
      return {
        handleSubmit: jest.fn(fn => (e?: React.FormEvent) => {
          if (e) e.preventDefault()
          fn({ testField: 'test value' })
        }),
        reset: jest.fn(),
        getValues: jest.fn(() => ({})),
        setValue: jest.fn(),
        control: { _defaultValues: mockDefaultValues },
        formState: mockFormState,
        register: jest.fn(() => ({
          onChange: jest.fn(),
          onBlur: jest.fn(),
          name: 'test',
          ref: jest.fn(),
        })),
      }
    }),
  }
})

// Global mocks for browser APIs
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock fetch globally
global.fetch = jest.fn()
