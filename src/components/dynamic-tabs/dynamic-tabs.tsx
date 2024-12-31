import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

interface TabConfig {
  eventKey: string
  title: string
  content: React.ReactNode
  condition?: boolean
}

interface DynamicTabsProps {
  tabs: TabConfig[]
  defaultActiveKey: string
}

export const DynamicTabs = ({ tabs, defaultActiveKey }: DynamicTabsProps) => {
  return (
    <div className="app-container">
      <Tabs defaultActiveKey={defaultActiveKey} id="dynamicTabs">
        {tabs.map(
          tab =>
            (tab.condition === undefined || tab.condition) && (
              <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
                {tab.content}
              </Tab>
            )
        )}
      </Tabs>
    </div>
  )
}
