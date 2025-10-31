import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  try {
    // Fetch destinations
    const destinations = await client.fetch(
      `*[_type == "destination" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }`
    )

    destinations.forEach((dest: any) => {
      routes.push({
        url: `${siteUrl}/destinations/${dest.slug}`,
        lastModified: new Date(dest._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Fetch articles
    const articles = await client.fetch(
      `*[_type == "article" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }`
    )

    articles.forEach((article: any) => {
      routes.push({
        url: `${siteUrl}/articles/${article.slug}`,
        lastModified: new Date(article._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })

    // Fetch custom pages
    const pages = await client.fetch(
      `*[_type == "page" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }`
    )

    pages.forEach((page: any) => {
      routes.push({
        url: `${siteUrl}/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return routes
}
