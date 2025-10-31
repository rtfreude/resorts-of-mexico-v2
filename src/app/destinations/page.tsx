import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Section from '@/components/utility/Section'
import DestinationCard from '@/components/content/DestinationCard'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

export const metadata: Metadata = {
  title: 'Destinations in Mexico | Resort of Mexico',
  description:
    'Explore the best destinations in Mexico. From pristine beaches to historic cities, find your perfect Mexican getaway.',
  openGraph: {
    title: 'Destinations in Mexico',
    description: 'Explore the best destinations in Mexico',
    type: 'website',
  },
}

// Fetch all destinations
async function getDestinations() {
  const destinations = await client.fetch(
    `*[_type == "destination"] | order(featured desc, name asc) {
      _id,
      name,
      slug,
      shortDescription,
      heroImage,
      location,
      featured,
      publishedAt
    }`,
    {},
    {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    }
  )

  return destinations
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
  ]

  // Separate featured and regular destinations
  const featuredDestinations = destinations.filter((d: any) => d.featured)
  const regularDestinations = destinations.filter((d: any) => !d.featured)

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
            Discover Mexico
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px' }}>
            From stunning beaches and ancient ruins to vibrant cities and colonial towns,
            explore the diverse destinations that make Mexico an unforgettable travel
            experience.
          </Typography>
        </Container>
      </Box>

      {/* Breadcrumbs */}
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>

      {/* Featured Destinations */}
      {featuredDestinations.length > 0 && (
        <Section>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Featured Destinations
          </Typography>
          <Grid container spacing={3}>
            {featuredDestinations.map((destination: any) => (
              <Grid item xs={12} sm={6} md={4} key={destination._id}>
                <DestinationCard
                  name={destination.name}
                  slug={destination.slug.current}
                  shortDescription={destination.shortDescription}
                  heroImage={destination.heroImage}
                  location={destination.location}
                  featured={destination.featured}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}

      {/* All Destinations */}
      <Section background={featuredDestinations.length > 0 ? 'grey' : 'default'}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ mb: 4, fontWeight: 700 }}
        >
          {featuredDestinations.length > 0 ? 'More Destinations' : 'All Destinations'}
        </Typography>
        {regularDestinations.length > 0 ? (
          <Grid container spacing={3}>
            {regularDestinations.map((destination: any) => (
              <Grid item xs={12} sm={6} md={4} key={destination._id}>
                <DestinationCard
                  name={destination.name}
                  slug={destination.slug.current}
                  shortDescription={destination.shortDescription}
                  heroImage={destination.heroImage}
                  location={destination.location}
                  featured={destination.featured}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary">
            {featuredDestinations.length > 0
              ? 'More destinations coming soon!'
              : 'No destinations found. Check back soon!'}
          </Typography>
        )}
      </Section>
    </>
  )
}
