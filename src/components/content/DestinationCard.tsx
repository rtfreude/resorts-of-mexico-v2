import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material'
import Link from 'next/link'
import PlaceIcon from '@mui/icons-material/Place'
import { urlFor } from '@/lib/sanity.image'

interface DestinationCardProps {
  name: string
  slug: string
  shortDescription: string
  heroImage: any
  location?: {
    state?: string
    region?: string
  }
  featured?: boolean
}

export default function DestinationCard({
  name,
  slug,
  shortDescription,
  heroImage,
  location,
  featured,
}: DestinationCardProps) {
  const imageUrl = heroImage ? urlFor(heroImage).width(600).height(400).url() : null

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl || '/placeholder-destination.jpg'}
          alt={heroImage?.alt || name}
          sx={{ objectFit: 'cover' }}
        />
        {featured && (
          <Chip
            label="Featured"
            color="secondary"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          {name}
        </Typography>

        {location?.state && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <PlaceIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {location.state}, Mexico
            </Typography>
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {shortDescription}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          href={`/destinations/${slug}`}
          variant="contained"
          fullWidth
          sx={{ textTransform: 'none' }}
        >
          Explore Destination
        </Button>
      </CardActions>
    </Card>
  )
}
