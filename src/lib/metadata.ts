import { Metadata } from 'next'
import { urlFor } from './sanity.image'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resortofmexico.com'

/**
 * Generate metadata for destination pages
 */
export function generateDestinationMetadata(destination: any): Metadata {
  const title = destination.seo?.metaTitle || `${destination.name} - Mexico Travel Guide`
  const description =
    destination.seo?.metaDescription ||
    destination.shortDescription ||
    `Discover ${destination.name}, Mexico. Complete travel guide with attractions, weather, and planning tips.`

  const ogImage = destination.seo?.ogImage
    ? urlFor(destination.seo.ogImage).width(1200).height(630).url()
    : destination.heroImage
      ? urlFor(destination.heroImage).width(1200).height(630).url()
      : null

  const canonicalUrl = `${siteUrl}/destinations/${destination.slug.current}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: destination.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

/**
 * Generate metadata for article pages
 */
export function generateArticleMetadata(article: any): Metadata {
  const title = article.seo?.metaTitle || `${article.title} | Resort of Mexico`
  const description =
    article.seo?.metaDescription ||
    article.excerpt ||
    'Discover Mexico travel tips, destination guides, and more.'

  const ogImage = article.seo?.ogImage
    ? urlFor(article.seo.ogImage).width(1200).height(630).url()
    : article.featuredImage
      ? urlFor(article.featuredImage).width(1200).height(630).url()
      : null

  const canonicalUrl = `${siteUrl}/articles/${article.slug.current}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: article.author?.name ? [{ name: article.author.name }] : [],
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt,
      authors: article.author?.name ? [article.author.name] : [],
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

/**
 * Generate metadata for page builder pages
 */
export function generatePageMetadata(page: any): Metadata {
  const title = page.seo?.metaTitle || `${page.title} | Resort of Mexico`
  const description =
    page.seo?.metaDescription || 'Discover Mexico travel information and guides.'

  const ogImage = page.seo?.ogImage
    ? urlFor(page.seo.ogImage).width(1200).height(630).url()
    : null

  const canonicalUrl = `${siteUrl}/${page.slug.current}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: page.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}
