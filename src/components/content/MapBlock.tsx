import React from 'react'
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HotelIcon from '@mui/icons-material/Hotel'
import FlightIcon from '@mui/icons-material/Flight'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AttractionsIcon from '@mui/icons-material/Attractions'

interface Location {
  name: string
  address?: string
  icon?: string
  _key?: string
}

interface MapBlockProps {
  title?: string
  description?: string
  mapType: 'embed' | 'static'
  embedUrl?: string
  staticImage?: any
  locations?: Location[]
  height?: string
  showLocationList?: boolean
  locationListPosition?: 'right' | 'left' | 'below'
  borderRadius?: boolean
}

const iconMap: Record<string, React.ReactElement> = {
  pin: <LocationOnIcon />,
  hotel: <HotelIcon />,
  airport: <FlightIcon />,
  beach: <BeachAccessIcon />,
  restaurant: <RestaurantIcon />,
  shopping: <ShoppingBagIcon />,
  attraction: <AttractionsIcon />,
}

export default function MapBlock({
  title,
  description,
  mapType,
  embedUrl,
  staticImage,
  locations = [],
  height = '450',
  showLocationList = true,
  locationListPosition = 'right',
  borderRadius = true,
}: MapBlockProps) {
  const mapHeight = parseInt(height, 10) || 450

  const MapComponent = () => (
    <Box
      sx={{
        width: '100%',
        height: mapHeight,
        borderRadius: borderRadius ? 2 : 0,
        overflow: 'hidden',
        boxShadow: 2,
        bgcolor: 'grey.100',
      }}
    >
      {mapType === 'embed' && embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title || 'Map'}
        />
      ) : mapType === 'static' && staticImage ? (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={urlFor(staticImage).width(1200).height(mapHeight).url()}
            alt={title || 'Map'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
          }}
        >
          <Typography>Map not configured</Typography>
        </Box>
      )}
    </Box>
  )

  const LocationList = () => {
    if (!showLocationList || !locations.length) return null

    return (
      <Card
        sx={{
          height: locationListPosition === 'below' ? 'auto' : mapHeight,
          overflow: 'auto',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Locations
          </Typography>
          <List>
            {locations.map((location, index) => (
              <ListItem key={location._key || index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  {iconMap[location.icon || 'pin'] || iconMap.pin}
                </ListItemIcon>
                <ListItemText
                  primary={location.name}
                  secondary={location.address}
                  primaryTypographyProps={{
                    fontWeight: 600,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    )
  }

  const isSideLayout = locationListPosition !== 'below' && showLocationList && locations.length > 0
  const mapColumns = isSideLayout ? 8 : 12
  const listColumns = isSideLayout ? 4 : 12

  return (
    <Box>
      {(title || description) && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {title && (
            <Typography variant="h3" component="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              {description}
            </Typography>
          )}
        </Box>
      )}

      <Grid container spacing={3}>
        {locationListPosition === 'left' && showLocationList && locations.length > 0 && (
          <Grid item xs={12} md={listColumns}>
            <LocationList />
          </Grid>
        )}

        <Grid item xs={12} md={mapColumns}>
          <MapComponent />
        </Grid>

        {locationListPosition === 'right' && showLocationList && locations.length > 0 && (
          <Grid item xs={12} md={listColumns}>
            <LocationList />
          </Grid>
        )}

        {locationListPosition === 'below' && showLocationList && locations.length > 0 && (
          <Grid item xs={12}>
            <LocationList />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
