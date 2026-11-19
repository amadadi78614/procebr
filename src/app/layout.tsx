import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WNS × Telkom — Procurement Intelligence Hub',
  description: 'Procurement Executive Business Review · FY27 H1 · November 2026 · Telkom SA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
