import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import { Toast } from '@/components/toast/toast'

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
    <html lang={locale} data-bs-theme="light">
      <body
        className={`${inter.className} app-default`}
        data-kt-app-layout="light-sidebar"
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}

          <Toast />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
