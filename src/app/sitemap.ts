import { MetadataRoute } from 'next'
// import { sanityClient } from '@/lib/sanity.client'
// import { groq } from 'next-sanity'

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
  ]

  try {
    // Fetch destinations (when we have them in Phase 5+)
    // const destinations = await sanityClient.fetch(groq`
    //   *[_type == "destination" && !(_id in path("drafts.**"))] {
    //     "slug": slug.current,
    //     _updatedAt
    //   }
    // `)

    // destinations.forEach((dest: any) => {
    //   routes.push({
    //     url: `${siteUrl}/destinations/${dest.slug}`,
    //     lastModified: new Date(dest._updatedAt),
    //     changeFrequency: 'weekly',
    //     priority: 0.8,
    //   })
    // })

    // Fetch articles (when we have them in Phase 5+)
    // const articles = await sanityClient.fetch(groq`
    //   *[_type == "article" && !(_id in path("drafts.**"))] {
    //     "slug": slug.current,
    //     _updatedAt
    //   }
    // `)

    // articles.forEach((article: any) => {
    //   routes.push({
    //     url: `${siteUrl}/blog/${article.slug}`,
    //     lastModified: new Date(article._updatedAt),
    //     changeFrequency: 'monthly',
    //     priority: 0.6,
    //   })
    // })
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return routes
}
