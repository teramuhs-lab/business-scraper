import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Business Scraper',
  description: 'Search and discover local businesses with AI-powered summaries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {children}
      </body>
    </html>
  )
}
