import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { urlFor } from '@/lib/sanity.image'

interface CardItem {
  icon?: any
  title: string
  description: string
  link?: {
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
}

interface CardGridProps {
  title?: string
  cards: CardItem[]
  columns?: '2' | '3' | '4' | 'auto'
  cardStyle?: 'default' | 'outlined' | 'elevated' | 'flat'
  iconPosition?: 'top' | 'left'
  textAlign?: 'left' | 'center'
}

export default function CardGrid({
  title,
  cards,
  columns = '3',
  cardStyle = 'default',
  iconPosition = 'top',
  textAlign = 'center',
}: CardGridProps) {
  // Calculate grid columns
  const gridColumns = {
    xs: 12,
    sm: 6,
    md: columns === 'auto' ? 4 : columns === '4' ? 3 : columns === '3' ? 4 : 6,
    lg: columns === 'auto' ? 3 : columns === '4' ? 3 : columns === '3' ? 4 : 6,
  }

  // Card variant based on style
  const cardVariant =
    cardStyle === 'outlined'
      ? 'outlined'
      : cardStyle === 'elevated'
        ? 'elevation'
        : undefined

  const cardElevation = cardStyle === 'elevated' ? 3 : cardStyle === 'flat' ? 0 : 1

  const cardSx =
    cardStyle === 'flat'
      ? { backgroundColor: 'transparent', boxShadow: 'none' }
      : cardStyle === 'outlined'
        ? { border: '1px solid', borderColor: 'divider' }
        : {}

  // Get link URL
  const getLinkUrl = (link?: CardItem['link']) => {
    if (!link) return null
    if (link.linkType === 'external') return link.externalUrl
    if (link.linkType === 'affiliate') return link.affiliateUrl
    if (link.customPath) return link.customPath
    if (link.internalLink) {
      return `/${link.internalLink._type}/${link.internalLink.slug.current}`
    }
    return null
  }

  return (
    <Box>
      {/* Section Title */}
      {title && (
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {cards.map((card, index) => {
          const linkUrl = getLinkUrl(card.link)
          const isHorizontal = iconPosition === 'left'

          return (
            <Grid item key={index} {...gridColumns}>
              <Card
                variant={cardVariant}
                elevation={cardElevation}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ...(linkUrl && {
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }),
                  ...cardSx,
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: isHorizontal ? 'row' : 'column',
                    alignItems: isHorizontal ? 'flex-start' : textAlign,
                    gap: 2,
                    textAlign: textAlign,
                  }}
                >
                  {/* Icon */}
                  {card.icon && (
                    <Box
                      sx={{
                        position: 'relative',
                        width: isHorizontal ? 60 : 80,
                        height: isHorizontal ? 60 : 80,
                        flexShrink: 0,
                        mb: isHorizontal ? 0 : 2,
                      }}
                    >
                      <Image
                        src={urlFor(card.icon).width(160).height(160).url()}
                        alt={card.icon.alt || card.title}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="160px"
                      />
                    </Box>
                  )}

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        mb: card.link ? 2 : 0,
                      }}
                    >
                      {card.description}
                    </Typography>

                    {/* Link Button */}
                    {card.link && linkUrl && (
                      <Button
                        component={Link}
                        href={linkUrl}
                        variant="text"
                        color="primary"
                        sx={{
                          mt: 'auto',
                          alignSelf: textAlign === 'center' ? 'center' : 'flex-start',
                        }}
                      >
                        {card.link.text}
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
