import type { Metadata } from 'next'
import ThemeRegistry from '@/components/providers/ThemeRegistry'
import { sanityClient } from '@/lib/sanity.client'
import { globalSettingsQuery, GlobalSettings } from '@/lib/sanity.queries'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resort of Mexico - Discover Amazing Destinations',
  description: 'Explore the best resorts, hotels, and destinations across Mexico. Find your perfect getaway with expert travel guides and recommendations.',
}

async function getGlobalSettings(): Promise<GlobalSettings | null> {
  try {
    const settings = await sanityClient.fetch<GlobalSettings>(
      globalSettingsQuery,
      {},
      {
        cache: 'force-cache',
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    )
    return settings
  } catch (error) {
    console.error('Error fetching global settings:', error)
    return null
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getGlobalSettings()

  return (
    <html lang="en">
      <body>
        <ThemeRegistry settings={settings}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
