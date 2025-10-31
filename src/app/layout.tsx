import type { Metadata } from 'next'
import ThemeRegistry from '@/components/providers/ThemeRegistry'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resort of Mexico - Discover Amazing Destinations',
  description: 'Explore the best resorts, hotels, and destinations across Mexico. Find your perfect getaway with expert travel guides and recommendations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
