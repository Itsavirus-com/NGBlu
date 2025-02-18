'use client'

import { useTheme } from '@/contexts/ThemeContext'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { themeMode } = useTheme()

  return (
    <div
      className="app-default"
      data-kt-app-layout={`${themeMode}-sidebar`}
      data-kt-app-header-fixed="true"
      data-kt-app-header-fixed-mobile="true"
      data-kt-app-sidebar-hoverable="true"
      data-kt-app-sidebar-push-header="true"
      data-kt-app-sidebar-push-toolbar="true"
      data-kt-app-sidebar-push-footer="true"
      data-kt-app-sidebar-enabled="true"
      data-kt-app-sidebar-fixed="true"
      data-kt-app-toolbar-enabled="true"
      data-kt-app-sidebar-minimize="off"
    >
      {children}
    </div>
  )
}
