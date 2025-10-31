import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import { generateArticleMetadata } from '@/lib/metadata'
import { generateArticleSchema } from '@/lib/structuredData'
// ...existing code...
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Section from '@/components/utility/Section'
import PortableTextRenderer from '@/components/portabletext/PortableTextRenderer'
import ArticleCard from '@/components/content/ArticleCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { MdAccessTime, MdCalendarToday } from 'react-icons/md'
import { format } from 'date-fns'
import Image from 'next/image'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Fetch article data
async function getArticle(slug: string) {
  const article = await client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      body,
      featuredImage,
      author->{
        _id,
        name,
        bio,
        image,
        socialMedia
      },
      categories[]->{
        _id,
        name,
        slug,
        color
      },
      tags[]->{
        _id,
        name,
        slug
      },
      publishedAt,
      lastModified,
      readingTime,
      relatedArticles[]->{
        _id,
        title,
        slug,
        excerpt,
        featuredImage,
        author->{
          name,
          image
        },
        categories[]->{
          name,
          color
        },
        publishedAt,
        readingTime
      },
      seo,
      _updatedAt
    }`,
    { slug },
    {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    }
  )

  return article
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await client.fetch(
    `*[_type == "article" && defined(slug.current)][]{
      "slug": slug.current
    }`
  )

  return articles.map((article: { slug: string }) => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return generateArticleMetadata(article)
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  // Generate structured data
  const structuredData = generateArticleSchema(article)

  // Breadcrumb items
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    ...(article.categories && article.categories.length > 0
      ? [
          {
            label: article.categories[0].name,
            href: `/articles/category/${article.categories[0].slug.current}`,
          },
        ]
      : []),
    { label: article.title, href: `/articles/${article.slug.current}` },
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Article Header */}
      <Box sx={{ bgcolor: 'background.paper', py: 4 }}>
  {/* Removed Container wrapper */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mt: 3, mb: 2 }}>
              {article.categories.map((category: any) => (
                <Chip
                  key={category._id}
                  label={category.name}
                  size="small"
                  sx={{
                    bgcolor: category.color || 'primary.main',
                    color: 'white',
                  }}
                />
              ))}
            </Stack>
          )}

          {/* Title */}
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              mt: 2,
            }}
          >
            {article.title}
          </Typography>

          {/* Excerpt */}
          {article.excerpt && (
            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              sx={{ fontSize: '1.25rem', lineHeight: 1.6, mt: 2 }}
            >
              {article.excerpt}
            </Typography>
          )}

          {/* Author & Meta Info */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: 3 }}
          >
            {article.author && (
              <Stack direction="row" spacing={2} alignItems="center">
                {article.author.image && (
                  <Avatar
                    src={urlFor(article.author.image).width(80).height(80).url()}
                    alt={article.author.name}
                    sx={{ width: 48, height: 48 }}
                  />
                )}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {article.author.name}
                  </Typography>
                  {article.publishedAt && (
                    <Typography variant="caption" color="text.secondary">
                      <MdCalendarToday
                        style={{ fontSize: '0.875rem', verticalAlign: 'middle' }}
                      />{' '}
                      {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                    </Typography>
                  )}
                </Box>
              </Stack>
            )}

            {article.readingTime && (
              <>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Typography variant="body2" color="text.secondary">
                  <MdAccessTime style={{ fontSize: '1rem', verticalAlign: 'middle' }} />{' '}
                  {article.readingTime} min read
                </Typography>
              </>
            )}
          </Stack>
  {/* End removed Container wrapper */}
      </Box>

      {/* Featured Image */}
      {article.featuredImage && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 300, sm: 400, md: 500 },
            bgcolor: 'grey.200',
          }}
        >
          <Image
            src={urlFor(article.featuredImage).width(1920).height(1080).url()}
            alt={article.featuredImage.alt || article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        </Box>
      )}

      {/* Article Body */}
      <Section>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          <PortableTextRenderer value={article.body} />
        </Box>
      </Section>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <Section background="grey">
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Tags:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {article.tags.map((tag: any) => (
                <Chip
                  key={tag._id}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                  component="a"
                  href={`/articles/tag/${tag.slug.current}`}
                  clickable
                />
              ))}
            </Stack>
          </Box>
        </Section>
      )}

      {/* Author Bio */}
      {article.author && article.author.bio && (
        <Section>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Divider sx={{ mb: 4 }} />
            <Stack direction="row" spacing={3} alignItems="flex-start">
              {article.author.image && (
                <Avatar
                  src={urlFor(article.author.image).width(120).height(120).url()}
                  alt={article.author.name}
                  sx={{ width: 80, height: 80 }}
                />
              )}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  About {article.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.author.bio}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Section>
      )}

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <Section background="grey">
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Related Articles
          </Typography>
          <Grid container spacing={3}>
            {article.relatedArticles.map((related: any) => (
              <Grid item xs={12} sm={6} md={4} key={related._id}>
                <ArticleCard
                  title={related.title}
                  slug={related.slug.current}
                  excerpt={related.excerpt}
                  featuredImage={related.featuredImage}
                  author={related.author}
                  categories={related.categories}
                  publishedAt={related.publishedAt}
                  readingTime={related.readingTime}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}
    </>
  )
}
