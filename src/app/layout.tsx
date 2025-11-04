import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import ThemeRegistry from '@/components/providers/ThemeRegistry'
import { sanityClient } from '@/lib/sanity.client'
import { globalSettingsQuery, GlobalSettings } from '@/lib/sanity.queries'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structuredData'
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const title = settings?.title || 'Resort of Mexico'
  const description = settings?.description || 'Discover the best resorts and destinations across Mexico'

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: title,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getGlobalSettings()
  const isDraftMode = (await draftMode()).isEnabled

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
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
