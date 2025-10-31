import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import Image from 'next/image'
import AffiliateButton from './AffiliateButton'

interface AffiliateCardProps {
  title: string
  description: string
  partner: string
  url: string
  ctaText?: string
  image?: string
  price?: string
  rating?: number
  featured?: boolean
}

export default function AffiliateCard({
  title,
  description,
  partner,
  url,
  ctaText = 'View Offer',
  image,
  price,
  rating,
  featured,
}: AffiliateCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: featured ? '2px solid' : undefined,
        borderColor: featured ? 'primary.main' : undefined,
        position: 'relative',
      }}
    >
      {featured && (
        <Chip
          label="Best Value"
          color="secondary"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            fontWeight: 600,
          }}
        />
      )}

      {image && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 200,
            backgroundColor: 'grey.200',
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Header */}
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mb: 0.5 }}
          >
            {partner}
          </Typography>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>

        {/* Price & Rating */}
        {(price || rating) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {price && (
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                {price}
              </Typography>
            )}
            {rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ⭐ {rating.toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {description}
        </Typography>

        {/* CTA Button */}
        <AffiliateButton href={url} text={ctaText} fullWidth />

        {/* Disclosure */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.7rem', textAlign: 'center' }}
        >
          *Affiliate link - we earn a commission at no extra cost to you
        </Typography>
      </CardContent>
    </Card>
  )
}
