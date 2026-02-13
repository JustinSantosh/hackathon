import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'CSIDC Land Compliance Dashboard',
  description: 'Industrial Land Compliance Monitoring & Encroachment Detection System',
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-hidden">
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'hsl(222 47% 14%)',
              border: '1px solid hsl(217 33% 20%)',
              color: 'hsl(210 40% 96%)',
            },
          }}
        />
      </body>
    </html>
  )
}
