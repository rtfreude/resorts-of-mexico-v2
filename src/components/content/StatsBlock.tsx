import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

interface Stat {
  number: string
  label: string
  icon?: any
}

interface StatsBlockProps {
  title?: string
  stats: Stat[]
  columns?: '2' | '3' | '4' | '5' | 'auto'
  style?: 'minimal' | 'boxed' | 'highlighted'
  alignment?: 'left' | 'center'
}

export default function StatsBlock({
  title,
  stats,
  columns = '4',
  style = 'minimal',
  alignment = 'center',
}: StatsBlockProps) {
  // Calculate grid columns
  const getGridColumns = () => {
    switch (columns) {
      case '2':
        return { xs: 6, sm: 6, md: 6 }
      case '3':
        return { xs: 6, sm: 4, md: 4 }
      case '4':
        return { xs: 6, sm: 6, md: 3 }
      case '5':
        return { xs: 6, sm: 4, md: 2.4 }
      case 'auto':
      default:
        return { xs: 6, sm: 4, md: 3 }
    }
  }

  const gridColumns = getGridColumns()
  const isBoxed = style === 'boxed'
  const isHighlighted = style === 'highlighted'

  return (
    <Box>
      {/* Section Title */}
      {title && (
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 6,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => {
          const content = (
            <Box
              sx={{
                textAlign: alignment,
                py: isBoxed || isHighlighted ? 4 : 2,
                px: isBoxed || isHighlighted ? 3 : 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: alignment === 'center' ? 'center' : 'flex-start',
              }}
            >
              {/* Icon */}
              {stat.icon && (
                <Box
                  sx={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    mb: 2,
                  }}
                >
                  <Image
                    src={urlFor(stat.icon).width(96).height(96).url()}
                    alt={stat.icon.alt || stat.label}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="96px"
                  />
                </Box>
              )}

              {/* Number */}
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: isHighlighted ? 'primary.main' : 'text.primary',
                  mb: 1,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                {stat.number}
              </Typography>

              {/* Label */}
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          )

          return (
            <Grid item key={index} {...gridColumns}>
              {isBoxed || isHighlighted ? (
                <Paper
                  elevation={isBoxed ? 2 : 0}
                  sx={{
                    height: '100%',
                    ...(isHighlighted && {
                      border: '2px solid',
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.light',
                    }),
                  }}
                >
                  {content}
                </Paper>
              ) : (
                content
              )}
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
