'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

interface ItineraryDay {
  day: number
  title: string
  description?: string
  _key?: string
}

interface Package {
  packageName: string
  tagline?: string
  image: any
  duration: string
  price: number
  priceNote?: string
  featured?: boolean
  highlights?: string[]
  itinerary?: ItineraryDay[]
  included?: string[]
  notIncluded?: string[]
  bookingUrl?: string
  bookingText?: string
  _key?: string
}

interface PackageBlockProps {
  title?: string
  subtitle?: string
  packages: Package[]
  layout?: 'cards' | 'list' | 'comparison'
  columns?: string
}

export default function PackageBlock({
  title = 'Travel Packages',
  subtitle,
  packages = [],
  layout = 'cards',
  columns = '3',
}: PackageBlockProps) {
  const [expandedPackage, setExpandedPackage] = useState<string | false>(false)

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPackage(isExpanded ? panel : false)
  }

  const gridColumns = {
    '1': 12,
    '2': 6,
    '3': 4,
  }[columns] || 4

  const CardsView = () => (
    <Grid container spacing={3}>
      {packages.map((pkg, index) => (
        <Grid item xs={12} md={gridColumns} key={pkg._key || index}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6,
              },
            }}
          >
            {pkg.featured && (
              <Chip
                icon={<StarIcon />}
                label="Featured"
                color="warning"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 1,
                  fontWeight: 700,
                }}
              />
            )}

            <Box sx={{ position: 'relative', height: 240 }}>
              <Image
                src={urlFor(pkg.image).width(600).height(400).url()}
                alt={pkg.packageName}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                {pkg.packageName}
              </Typography>
              {pkg.tagline && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {pkg.tagline}
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="body2" fontWeight={600}>
                  {pkg.duration}
                </Typography>
              </Box>

              {pkg.highlights && pkg.highlights.length > 0 && (
                <List dense sx={{ mt: 2 }}>
                  {pkg.highlights.slice(0, 4).map((highlight, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={highlight}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>

            <Divider />

            <CardActions sx={{ p: 2, flexDirection: 'column', alignItems: 'stretch' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    From
                  </Typography>
                  <Typography variant="h4" color="primary.main" fontWeight={700}>
                    ${pkg.price}
                  </Typography>
                  {pkg.priceNote && (
                    <Typography variant="caption" color="text.secondary">
                      {pkg.priceNote}
                    </Typography>
                  )}
                </Box>
              </Box>

              {pkg.bookingUrl && (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  href={pkg.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pkg.bookingText || 'Book Now'}
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )

  const ListView = () => (
    <Box>
      {packages.map((pkg, index) => (
        <Card key={pkg._key || index} sx={{ mb: 3 }}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative', height: { xs: 200, md: '100%' }, minHeight: 300 }}>
                <Image
                  src={urlFor(pkg.image).width(600).height(600).url()}
                  alt={pkg.packageName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {pkg.featured && (
                  <Chip
                    icon={<StarIcon />}
                    label="Featured"
                    color="warning"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 700,
                    }}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {pkg.packageName}
                    </Typography>
                    {pkg.tagline && (
                      <Typography variant="body1" color="text.secondary">
                        {pkg.tagline}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      From
                    </Typography>
                    <Typography variant="h3" color="primary.main" fontWeight={700}>
                      ${pkg.price}
                    </Typography>
                    {pkg.priceNote && (
                      <Typography variant="caption" color="text.secondary">
                        {pkg.priceNote}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Chip
                  icon={<CalendarTodayIcon />}
                  label={pkg.duration}
                  sx={{ mb: 2 }}
                />

                {pkg.highlights && pkg.highlights.length > 0 && (
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {pkg.highlights.map((highlight, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon fontSize="small" color="success" />
                          <Typography variant="body2">{highlight}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {/* Itinerary Accordion */}
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <Accordion
                    expanded={expandedPackage === `itinerary-${index}`}
                    onChange={handleAccordionChange(`itinerary-${index}`)}
                    sx={{ mt: 2 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={600}>View Itinerary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {pkg.itinerary.map((day) => (
                          <ListItem key={day._key} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="subtitle2" fontWeight={700}>
                              Day {day.day}: {day.title}
                            </Typography>
                            {day.description && (
                              <Typography variant="body2" color="text.secondary">
                                {day.description}
                              </Typography>
                            )}
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                )}

                {pkg.bookingUrl && (
                  <Button
                    variant="contained"
                    size="large"
                    href={pkg.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 2 }}
                  >
                    {pkg.bookingText || 'Book Now'}
                  </Button>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  )

  return (
    <Box>
      {/* Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {title && (
            <Typography variant="h3" component="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Package Display */}
      {layout === 'cards' && <CardsView />}
      {layout === 'list' && <ListView />}
    </Box>
  )
}
