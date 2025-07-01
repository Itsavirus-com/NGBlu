'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import { MasterInit } from '@/components/core/MasterInit'
import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import { SessionChecker } from '@/components/session/SessionChecker'
import { Sidebar } from '@/components/sidebar/sidebar'
import { TotpEnforcementBanner } from '@/components/totp/TotpEnforcementBanner'
import { useTotpEnforcement } from '@/hooks/use-totp-enforcement.hook'
import { fetcher } from '@/services/swr/fetcher'

import '@/assets/keenicons/duotone/style.css'
import '@/assets/keenicons/outline/style.css'
import '@/assets/keenicons/solid/style.css'

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { needsSetup, isChecking, userEmail, markSetupComplete } = useTotpEnforcement()

  return (
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <Header />
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
          <Sidebar />
          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
              {/* 2FA Enforcement Banner */}
              {!isChecking && needsSetup && (
                <div className="app-container container-fluid">
                  <TotpEnforcementBanner
                    userEmail={userEmail}
                    onSetupComplete={markSetupComplete}
                  />
                </div>
              )}

              {children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider>
        <SessionChecker />
        <DashboardContent>{children}</DashboardContent>
        <MasterInit />
      </SessionProvider>
    </SWRConfig>
  )
}
