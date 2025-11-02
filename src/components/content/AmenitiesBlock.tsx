import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/image'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { urlFor } from '@/lib/sanity.image'

interface Amenity {
  name: string
  icon?: any
  description?: string
}

interface AmenitiesBlockProps {
  title?: string
  amenities: Amenity[]
  layout?: 'grid' | 'list' | 'columns'
  columns?: '2' | '3' | '4' | '5' | 'auto'
  showIcons?: boolean
  showDescriptions?: boolean
}

export default function AmenitiesBlock({
  title,
  amenities,
  layout = 'grid',
  columns = '4',
  showIcons = true,
  showDescriptions = false,
}: AmenitiesBlockProps) {
  // Grid layout
  if (layout === 'grid') {
    const gridColumns = {
      xs: 6,
      sm: 4,
      md: columns === '5' ? 2.4 : columns === '4' ? 3 : columns === '3' ? 4 : 6,
    }

    return (
      <Box>
        {title && (
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}
          >
            {title}
          </Typography>
        )}

        <Grid container spacing={3}>
          {amenities.map((amenity, index) => (
            <Grid item key={index} {...gridColumns}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                }}
              >
                {showIcons && (
                  amenity.icon ? (
                    <Box
                      sx={{
                        position: 'relative',
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Image
                        src={urlFor(amenity.icon).width(96).height(96).url()}
                        alt={amenity.icon.alt || amenity.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="96px"
                      />
                    </Box>
                  ) : (
                    <CheckCircleIcon
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  )
                )}
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {amenity.name}
                </Typography>
                {showDescriptions && amenity.description && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: 'text.secondary' }}
                  >
                    {amenity.description}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  // List layout
  if (layout === 'list') {
    return (
      <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
        {title && (
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            {title}
          </Typography>
        )}

        <List>
          {amenities.map((amenity, index) => (
            <ListItem key={index} disableGutters>
              {showIcons && (
                <ListItemIcon sx={{ minWidth: 56 }}>
                  {amenity.icon ? (
                    <Box
                      sx={{
                        position: 'relative',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Image
                        src={urlFor(amenity.icon).width(80).height(80).url()}
                        alt={amenity.icon.alt || amenity.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="80px"
                      />
                    </Box>
                  ) : (
                    <CheckCircleIcon color="primary" />
                  )}
                </ListItemIcon>
              )}
              <ListItemText
                primary={amenity.name}
                secondary={showDescriptions ? amenity.description : undefined}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    )
  }

  // Compact columns layout
  return (
    <Box>
      {title && (
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}
        >
          {title}
        </Typography>
      )}

      <Grid container spacing={2}>
        {amenities.map((amenity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {showIcons &&
                (amenity.icon ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={urlFor(amenity.icon).width(64).height(64).url()}
                      alt={amenity.icon.alt || amenity.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="64px"
                    />
                  </Box>
                ) : (
                  <CheckCircleIcon color="primary" fontSize="small" />
                ))}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {amenity.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
