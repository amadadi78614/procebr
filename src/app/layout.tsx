import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WNS × Telkom — Procurement Intelligence Hub',
  description: 'Executive Business Review & Maturity Assessment · Procurement · FY26',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
