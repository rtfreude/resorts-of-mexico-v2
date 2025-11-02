import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Link from 'next/link'

interface PricingCard {
  title: string
  price: string
  period?: string
  badge?: string
  features: string[]
  cta: {
    text: string
    linkType?: 'internal' | 'external' | 'affiliate'
    externalUrl?: string
    affiliateUrl?: string
    customPath?: string
    internalLink?: {
      _type: string
      slug: {
        current: string
      }
    }
  }
  highlighted?: boolean
}

interface PricingCardBlockProps {
  title?: string
  subtitle?: string
  cards: PricingCard[]
  columns?: '1' | '2' | '3' | '4'
}

export default function PricingCardBlock({
  title,
  subtitle,
  cards,
  columns = '3',
}: PricingCardBlockProps) {
  // Calculate grid columns
  const gridColumns = {
    xs: 12,
    sm: columns === '1' ? 12 : 6,
    md: columns === '4' ? 3 : columns === '3' ? 4 : columns === '2' ? 6 : 12,
  }

  // Get link URL
  const getLinkUrl = (cta: PricingCard['cta']) => {
    if (cta.linkType === 'external') return cta.externalUrl
    if (cta.linkType === 'affiliate') return cta.affiliateUrl
    if (cta.customPath) return cta.customPath
    if (cta.internalLink) {
      return `/${cta.internalLink._type}/${cta.internalLink.slug.current}`
    }
    return '#'
  }

  return (
    <Box>
      {/* Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          {title && (
            <Typography
              variant="h2"
              component="h2"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="h6"
              sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Pricing Cards Grid */}
      <Grid container spacing={3} alignItems="stretch">
        {cards.map((card, index) => (
          <Grid item key={index} {...gridColumns}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...(card.highlighted && {
                  border: '2px solid',
                  borderColor: 'primary.main',
                  boxShadow: 6,
                  transform: { md: 'scale(1.05)' },
                }),
              }}
            >
              {/* Badge */}
              {card.badge && (
                <Chip
                  label={card.badge}
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontWeight: 600,
                  }}
                />
              )}

              <CardContent sx={{ flex: 1, pt: 4 }}>
                {/* Plan Title */}
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  {card.title}
                </Typography>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      display: 'inline',
                    }}
                  >
                    {card.price}
                  </Typography>
                  {card.period && (
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        ml: 1,
                        color: 'text.secondary',
                      }}
                    >
                      {card.period}
                    </Typography>
                  )}
                </Box>

                {/* Features List */}
                <List disablePadding>
                  {card.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              {/* CTA Button */}
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  component={Link}
                  href={getLinkUrl(card.cta) || '#'}
                  variant={card.highlighted ? 'contained' : 'outlined'}
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {card.cta.text}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
