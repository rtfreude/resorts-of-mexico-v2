import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import { generateDestinationMetadata } from '@/lib/metadata'
import { generateDestinationSchema } from '@/lib/structuredData'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Hero from '@/components/content/Hero'
import Section from '@/components/utility/Section'
import AffiliateCard from '@/components/affiliate/AffiliateCard'
import DestinationCard from '@/components/content/DestinationCard'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material'
import {
  MdLocationOn,
  MdWbSunny,
  MdBeachAccess,
  MdLocationCity,
  MdTerrain,
  MdMuseum,
  MdRestaurant,
  MdNightlife,
} from 'react-icons/md'

interface DestinationPageProps {
  params: Promise<{ slug: string }>
}

// Icon mapping for highlights
const iconMap: Record<string, any> = {
  beach: MdBeachAccess,
  historical: MdMuseum,
  cultural: MdLocationCity,
  nature: MdTerrain,
  dining: MdRestaurant,
  nightlife: MdNightlife,
}

// Fetch destination data
async function getDestination(slug: string) {
  const destination = await client.fetch(
    `*[_type == "destination" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      shortDescription,
      fullDescription,
      heroImage,
      gallery,
      location,
      highlights,
      bestTimeToVisit,
      weather,
      relatedDestinations[]->{
        _id,
        name,
        slug,
        shortDescription,
        heroImage,
        location,
        featured
      },
      seo,
      affiliateLinkOverrides,
      featured,
      publishedAt,
      _updatedAt
    }`,
    { slug },
    {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    }
  )

  return destination
}

// Generate static params for all destinations
export async function generateStaticParams() {
  const destinations = await client.fetch(
    `*[_type == "destination" && defined(slug.current)][]{
      "slug": slug.current
    }`
  )

  return destinations.map((destination: any) => ({
    slug: destination.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestination(slug)

  if (!destination) {
    return {
      title: 'Destination Not Found',
    }
  }

  return generateDestinationMetadata(destination)
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = await getDestination(slug)

  if (!destination) {
    notFound()
  }

  // Generate structured data
  const structuredData = generateDestinationSchema({
    name: destination.name,
    description: destination.shortDescription || destination.fullDescription || '',
    image: destination.heroImage ? urlFor(destination.heroImage).url() : undefined,
    url: `/destinations/${destination.slug.current}`,
    address: destination.location ? {
      city: destination.location.city,
      state: destination.location.state,
      country: 'MX',
    } : undefined,
  })

  // Breadcrumb items
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: destination.name, href: `/destinations/${destination.slug.current}` },
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <Hero
        title={destination.name}
        subtitle={destination.shortDescription}
        image={destination.heroImage}
        height="60vh"
        overlay={true}
      />

      {/* Breadcrumbs */}
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>

      {/* Location Info */}
      <Section>
        <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
          {destination.location?.city && (
            <Chip
              icon={<MdLocationOn />}
              label={`${destination.location.city}${destination.location.state ? `, ${destination.location.state}` : ''}`}
              variant="outlined"
            />
          )}
          {destination.featured && (
            <Chip label="Featured Destination" color="secondary" />
          )}
        </Stack>

        {/* Full Description */}
        <Typography variant="body1" paragraph sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
          {destination.fullDescription}
        </Typography>
      </Section>

      {/* Highlights Section */}
      {destination.highlights && destination.highlights.length > 0 && (
        <Section background="grey">
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Highlights & Attractions
          </Typography>
          <Grid container spacing={3}>
            {destination.highlights.map((highlight: any, index: number) => {
              const IconComponent = iconMap[highlight.icon] || MdLocationOn
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconComponent
                          style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                          color="primary"
                        />
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {highlight.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {highlight.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Section>
      )}

      {/* Best Time to Visit & Weather */}
      {(destination.bestTimeToVisit || destination.weather) && (
        <Section>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            When to Visit
          </Typography>
          <Grid container spacing={4}>
            {destination.bestTimeToVisit && (
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Best Time to Visit
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Peak Season:</strong> {destination.bestTimeToVisit.peakSeason}
                    </Typography>
                    {destination.bestTimeToVisit.shoulderSeason && (
                      <Typography variant="body1" paragraph>
                        <strong>Shoulder Season:</strong>{' '}
                        {destination.bestTimeToVisit.shoulderSeason}
                      </Typography>
                    )}
                    {destination.bestTimeToVisit.offSeason && (
                      <Typography variant="body1">
                        <strong>Off Season:</strong> {destination.bestTimeToVisit.offSeason}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )}
            {destination.weather && (
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MdWbSunny style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Weather Information
                      </Typography>
                    </Box>
                    {destination.weather.averageTemp && (
                      <Typography variant="body1" paragraph>
                        <strong>Average Temperature:</strong> {destination.weather.averageTemp}
                      </Typography>
                    )}
                    {destination.weather.rainyMonths && (
                      <Typography variant="body1" paragraph>
                        <strong>Rainy Season:</strong> {destination.weather.rainyMonths}
                      </Typography>
                    )}
                    {destination.weather.notes && (
                      <Typography variant="body2" color="text.secondary">
                        {destination.weather.notes}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Section>
      )}

      {/* Placeholder for Affiliate Links (Hotels, Tours) */}
      <Section background="grey">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ mb: 4, fontWeight: 700 }}
        >
          Plan Your Visit
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Find the best hotels, tours, and activities in {destination.name}
        </Typography>
        <Grid container spacing={3}>
          {/* Example affiliate cards - these would be populated from Sanity in Phase 9 */}
          <Grid item xs={12} sm={6} md={4}>
            <AffiliateCard
              title={`Hotels in ${destination.name}`}
              description="Find and compare the best hotel deals"
              price="From $80/night"
              url="#"
              ctaText="View Hotels"
              image={destination.heroImage}
              partner="Booking.com"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AffiliateCard
              title={`Tours & Activities`}
              description="Discover exciting tours and experiences"
              price="From $25/person"
              url="#"
              ctaText="Book Tours"
              image={destination.heroImage}
              partner="Viator"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AffiliateCard
              title={`Travel Guide`}
              description="Complete travel planning resources"
              url="#"
              ctaText="Learn More"
              image={destination.heroImage}
              partner="Resort of Mexico"
            />
          </Grid>
        </Grid>
      </Section>

      {/* Related Destinations */}
      {destination.relatedDestinations && destination.relatedDestinations.length > 0 && (
        <Section>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Explore More Destinations
          </Typography>
          <Grid container spacing={3}>
            {destination.relatedDestinations.map((related: any) => (
              <Grid item xs={12} sm={6} md={4} key={related._id}>
                <DestinationCard
                  name={related.name}
                  slug={related.slug.current}
                  shortDescription={related.shortDescription}
                  heroImage={related.heroImage}
                  location={related.location}
                  featured={related.featured}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}
    </>
  )
}
