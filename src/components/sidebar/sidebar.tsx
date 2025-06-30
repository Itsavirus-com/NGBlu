import { SidebarMenu } from './sidebar-menu/SidebarMenu'
import { SidebarLogo } from './SidebarLogo'

const Sidebar = () => {
  return (
    <div id="kt_app_sidebar" className="app-sidebar flex-column">
      <SidebarLogo />
      <SidebarMenu />
    </div>
  )
}

export { Sidebar }
