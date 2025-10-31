import { Metadata } from 'next'
import { GlobalSettings } from '../sanity.queries'

interface GenerateMetadataProps {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
  settings?: GlobalSettings | null
}

/**
 * Generate metadata for pages with SEO best practices
 */
export function generateSEOMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  settings,
}: GenerateMetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const fullUrl = `${siteUrl}${path}`

  // Use site title from Sanity if available
  const siteTitle = settings?.title || 'Resort of Mexico'
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

  // Use OG image from Sanity if no specific image provided
  const ogImage = image || settings?.ogImage?.asset?.url || `${siteUrl}/og-default.jpg`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

/**
 * Generate default metadata from Global Settings
 */
export function generateDefaultMetadata(settings: GlobalSettings | null): Metadata {
  return generateSEOMetadata({
    title: settings?.title || 'Resort of Mexico',
    description: settings?.description || 'Discover the best resorts and destinations across Mexico',
    settings,
  })
}
