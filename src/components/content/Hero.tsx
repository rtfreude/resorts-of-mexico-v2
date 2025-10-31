import { Box, Typography, Button, Container } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

interface HeroProps {
  title: string
  subtitle?: string
  image?: any // Sanity image object
  ctaText?: string
  ctaUrl?: string
  height?: string | number
  overlay?: boolean
}

export default function Hero({
  title,
  subtitle,
  image,
  ctaText,
  ctaUrl,
  height = '60vh',
  overlay = true,
}: HeroProps) {
  const imageUrl = image ? urlFor(image).width(1920).height(1080).url() : null

  return (
    <Box
      sx={{
        position: 'relative',
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'grey.900',
      }}
    >
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={image.alt || title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
      )}

      {/* Overlay */}
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />
      )}

      {/* Content */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '4rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{
              mb: 4,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {ctaText && ctaUrl && (
          <Button
            component={Link}
            href={ctaUrl}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.125rem',
              fontWeight: 600,
            }}
          >
            {ctaText}
          </Button>
        )}
      </Container>
    </Box>
  )
}
