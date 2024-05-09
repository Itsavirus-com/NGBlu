'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import { MasterInit } from '@/components/core/master-init'
import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar/sidebar'
import { fetcher } from '@/services/swr/fetcher'

import '@/assets/keenicons/duotone/style.css'
import '@/assets/keenicons/outline/style.css'
import '@/assets/keenicons/solid/style.css'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider>
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
          <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
            <Header />
            <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
              <Sidebar />
              <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                <div className="d-flex flex-column flex-column-fluid">{children}</div>
                <Footer />
              </div>
            </div>
          </div>
        </div>

        <MasterInit />
      </SessionProvider>
    </SWRConfig>
  )
}
