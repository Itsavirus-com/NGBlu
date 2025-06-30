import { RenderOptions, render as rtlRender } from '@testing-library/react'
import { PropsWithChildren } from 'react'

// Create a simple wrapper for tests - no need for intl provider since it's mocked
const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <div data-testid="test-wrapper">{children}</div>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof rtlRender> => {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything from testing library except render
export {
  act,
  cleanup,
  findAllByRole,
  findAllByText,
  findByRole,
  findByText,
  fireEvent,
  getAllByRole,
  getAllByText,
  getByRole,
  getByText,
  logRoles,
  prettyDOM,
  queryAllByRole,
  queryAllByText,
  queryByRole,
  queryByText,
  renderHook,
  screen,
  waitFor,
  within,
} from '@testing-library/react'

// Override the render function with our custom one
export { customRender as render }
