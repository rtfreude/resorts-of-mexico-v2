import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Section from '@/components/utility/Section'
import ArticleCard from '@/components/content/ArticleCard'
import { Typography, Grid, Box } from '@mui/material'

export const metadata: Metadata = {
  title: 'Articles & Travel Guides | Resort of Mexico',
  description:
    'Discover expert travel guides, tips, and stories about Mexico destinations. Plan your perfect trip with our comprehensive articles.',
  openGraph: {
    title: 'Mexico Travel Articles & Guides',
    description: 'Expert travel guides and tips for Mexico destinations',
    type: 'website',
  },
}

// Fetch all articles
async function getArticles() {
  const articles = await client.fetch(
    `*[_type == "article"] | order(publishedAt desc) {
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
    }`,
    {},
    {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    }
  )

  return articles
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
  ]

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 0,
        }}
      >
        <Container>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Travel Articles & Guides
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px' }}>
            Discover insider tips, destination guides, and inspiring stories to help you
            plan your perfect Mexico vacation.
          </Typography>
        </Container>
      </Box>

      {/* Breadcrumbs */}
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>

      {/* Articles Grid */}
      <Section background="grey">
        {articles.length > 0 ? (
          <Grid container spacing={3}>
            {articles.map((article: any) => (
              <Grid item xs={12} sm={6} md={4} key={article._id}>
                <ArticleCard
                  title={article.title}
                  slug={article.slug.current}
                  excerpt={article.excerpt}
                  featuredImage={article.featuredImage}
                  author={article.author}
                  categories={article.categories}
                  publishedAt={article.publishedAt}
                  readingTime={article.readingTime}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom>
              No articles found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back soon for new travel guides and stories!
            </Typography>
          </Box>
        )}
      </Section>
    </>
  )
}
