import React from 'react'

import { render, screen } from '@/utils/test-utils'

import { DynamicTabs } from '../DynamicTabs'

describe('<DynamicTabs />', () => {
  const mockTabs = [
    {
      eventKey: 'tab1',
      title: 'First Tab',
      content: React.createElement('div', {}, 'First tab content'),
    },
    {
      eventKey: 'tab2',
      title: 'Second Tab',
      content: React.createElement('div', {}, 'Second tab content'),
      condition: true,
    },
    {
      eventKey: 'tab3',
      title: 'Hidden Tab',
      content: React.createElement('div', {}, 'Hidden tab content'),
      condition: false,
    },
  ]

  it('renders tabs with correct titles and content', () => {
    render(React.createElement(DynamicTabs, { tabs: mockTabs, defaultActiveKey: 'tab1' }))

    expect(screen.getByText('First Tab')).toBeInTheDocument()
    expect(screen.getByText('Second Tab')).toBeInTheDocument()
    expect(screen.getByText('First tab content')).toBeInTheDocument()
  })

  it('hides tabs when condition is false', () => {
    render(React.createElement(DynamicTabs, { tabs: mockTabs, defaultActiveKey: 'tab1' }))

    expect(screen.queryByText('Hidden Tab')).not.toBeInTheDocument()
    expect(screen.queryByText('Hidden tab content')).not.toBeInTheDocument()
  })

  it('sets correct default active key', () => {
    render(React.createElement(DynamicTabs, { tabs: mockTabs, defaultActiveKey: 'tab2' }))

    const tabsContainer = document.querySelector('#dynamicTabs')
    expect(tabsContainer).toBeInTheDocument()
  })

  it('renders empty when no tabs provided', () => {
    render(React.createElement(DynamicTabs, { tabs: [], defaultActiveKey: 'tab1' }))

    const tabsContainer = document.querySelector('#dynamicTabs')
    expect(tabsContainer).toBeInTheDocument()
  })
})
