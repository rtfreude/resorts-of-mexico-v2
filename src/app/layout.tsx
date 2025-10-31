import type { Metadata } from 'next'
import ThemeRegistry from '@/components/providers/ThemeRegistry'
import { sanityClient } from '@/lib/sanity.client'
import { globalSettingsQuery, GlobalSettings } from '@/lib/sanity.queries'
import { generateDefaultMetadata } from '@/lib/seo/metadata'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/structuredData'
import './globals.css'

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings()
  return generateDefaultMetadata(settings)
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getGlobalSettings()

  // Generate structured data
  const organizationSchema = generateOrganizationSchema(settings)
  const webSiteSchema = generateWebSiteSchema(settings)

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        <ThemeRegistry settings={settings}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
