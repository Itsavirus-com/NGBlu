import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/assets/sass/style.scss'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'InfraOrders 2.0',
  description: 'Fast, Efficient and Productive',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
