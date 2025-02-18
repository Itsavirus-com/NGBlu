import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import { Toast } from '@/components/toast/toast'
import { ThemeProvider } from '@/contexts/ThemeContext'
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
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutWrapper>
              {children}
              <Toast />
            </LayoutWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
