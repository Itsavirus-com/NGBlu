import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import LoadingOverlay from '@/components/loading/LoadingOverlay'
import { SessionProviderWrapper } from '@/components/providers/SessionProviderWrapper'
import { SWRProviderWrapper } from '@/components/providers/SWRProviderWrapper'
import { SessionChecker } from '@/components/session/SessionChecker'
import { Toast } from '@/components/toast/toast'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { WorkspaceProvider } from '@/contexts/WorkspaceContext'
import { themeScript } from '@/lib/theme-script'

import { LayoutWrapper } from '../../components/layout-wrapper/LayoutWrapper'

import '@/assets/sass/style.scss'
import 'flatpickr/dist/flatpickr.css'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'InfraOrders 2.0',
  description: 'Fast, Efficient and Productive',
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <SWRProviderWrapper>
            <ThemeProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <WorkspaceProvider>
                  <LayoutWrapper>
                    {children}
                    <Toast />
                    <LoadingOverlay />
                    <SessionChecker />
                  </LayoutWrapper>
                </WorkspaceProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </SWRProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
