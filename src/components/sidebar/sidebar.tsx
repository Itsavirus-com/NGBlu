import { SidebarLogo } from './sidebar-logo'
import { SidebarMenu } from './sidebar-menu/sidebar-menu'

const Sidebar = () => {
  return (
    <div id="kt_app_sidebar" className="app-sidebar flex-column">
      <SidebarLogo />
      <SidebarMenu />
    </div>
  )
}

export { Sidebar }
