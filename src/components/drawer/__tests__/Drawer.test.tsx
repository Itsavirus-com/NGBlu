import { createCommonMocks, render, screen } from '@/utils/test-utils'

import { Drawer } from '../Drawer'
import { DrawerProps } from '../drawer.type'

// Set up mocks
createCommonMocks()

describe('<Drawer />', () => {
  const defaultProps: DrawerProps = {
    id: 'test-drawer',
    children: <div>Test Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders drawer with basic props', () => {
    render(<Drawer {...defaultProps} />)

    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(document.getElementById('kt_test-drawer')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument() // close button
  })

  it('renders with all optional props', () => {
    render(
      <Drawer id="full-drawer" title="Test Title" icon="document" dataId="DATA-123">
        <div>Full Content</div>
      </Drawer>
    )

    expect(screen.getByText('Full Content')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('DATA-123')).toBeInTheDocument()
    expect(document.querySelector('.badge')).toBeInTheDocument()
  })

  it('sets correct data attributes for KTDrawer', () => {
    render(<Drawer {...defaultProps} />)

    const drawer = document.getElementById('kt_test-drawer')
    expect(drawer).toHaveAttribute('data-kt-drawer', 'true')
    expect(drawer).toHaveAttribute('data-kt-drawer-name', 'help')
    expect(drawer).toHaveAttribute('data-kt-drawer-direction', 'end')
  })

  it('generates correct element IDs', () => {
    render(<Drawer {...defaultProps} />)

    expect(document.getElementById('kt_test-drawer_header')).toBeInTheDocument()
    expect(document.getElementById('kt_test-drawer_body')).toBeInTheDocument()
    expect(document.getElementById('kt_test-drawer_close')).toBeInTheDocument()
  })

  it('conditionally renders title section', () => {
    // Without title
    render(<Drawer {...defaultProps} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()

    // With title
    render(<Drawer {...defaultProps} title="Test Title" />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })
})
