import { useEffect } from 'react'

import { DrawerComponent } from './drawer-component'
import { MenuComponent } from './menu-component'
import { ToggleComponent } from './toggle-component'

export function MasterInit() {
  const pluginsInitialization = () => {
    setTimeout(() => {
      ToggleComponent.bootstrap()
      MenuComponent.bootstrap()
      DrawerComponent.bootstrap()
    }, 500)
  }

  useEffect(() => {
    if (!document.body.classList.contains('master-init')) {
      document.body.classList.add('master-init')
      pluginsInitialization()
    }
  }, [])

  return <></>
}
