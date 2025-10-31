import { GlobalSettings } from '../sanity.queries'

/**
 * Generate Organization schema for the website
 */
export function generateOrganizationSchema(settings: GlobalSettings | null) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.title || 'Resort of Mexico',
    description: settings?.description || 'Discover amazing destinations across Mexico',
    url: siteUrl,
    logo: settings?.logo?.asset?.url,
    sameAs: [
      settings?.socialMedia?.facebook,
      settings?.socialMedia?.instagram,
      settings?.socialMedia?.twitter,
      settings?.socialMedia?.youtube,
      settings?.socialMedia?.pinterest,
    ].filter(Boolean),
  }
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(settings: GlobalSettings | null) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings?.title || 'Resort of Mexico',
    description: settings?.description || 'Discover amazing destinations across Mexico',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema({
  title,
  description,
  author,
  publishDate,
  modifiedDate,
  image,
  url,
}: {
  title: string
  description: string
  author: string
  publishDate: string
  modifiedDate?: string
  image?: string
  url: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    image: image || `${siteUrl}/og-default.jpg`,
    url: `${siteUrl}${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Resort of Mexico',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  }
}

/**
 * Generate TouristDestination schema
 */
export function generateDestinationSchema({
  name,
  description,
  image,
  url,
  address,
}: {
  name: string
  description: string
  image?: string
  url: string
  address?: {
    city?: string
    state?: string
    country?: string
  }
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    image: image || `${siteUrl}/og-default.jpg`,
    url: `${siteUrl}${url}`,
  }

  if (address) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.country || 'MX',
    }
  }

  return schema
}
