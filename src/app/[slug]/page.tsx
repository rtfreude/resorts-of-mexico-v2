import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Section from '@/components/utility/Section'
import BlockRenderer from '@/components/blocks/BlockRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Fetch page data
async function getPage(slug: string) {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      blocks,
      seo,
      showBreadcrumbs,
      publishedAt,
      _updatedAt
    }`,
    { slug },
    {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    }
  )

  return page
}

// Generate static params for all pages
export async function generateStaticParams() {
  const pages = await client.fetch(
    `*[_type == "page" && defined(slug.current)][]{
      "slug": slug.current
    }`
  )

  return pages.map((page: any) => ({
    slug: page.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return generatePageMetadata(page)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: page.title, href: `/${page.slug.current}` },
  ]

  return (
    <>
      {/* Breadcrumbs (if enabled) */}
      {page.showBreadcrumbs && (
        <Section>
          <Breadcrumbs items={breadcrumbs} />
        </Section>
      )}

      {/* Page Content Blocks */}
      <BlockRenderer blocks={page.blocks || []} />
    </>
  )
}
