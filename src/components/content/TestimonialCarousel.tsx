import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import IconButton from '@mui/material/IconButton'
import MobileStepper from '@mui/material/MobileStepper'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { urlFor } from '@/lib/sanity.image'

interface Testimonial {
  quote: string
  author: string
  authorLocation?: string
  authorImage?: any
  rating?: number
}

interface TestimonialCarouselProps {
  title?: string
  testimonials: Testimonial[]
  layout?: 'single' | 'multi'
  autoplay?: boolean
  showNavigation?: boolean
  showIndicators?: boolean
}

export default function TestimonialCarousel({
  title,
  testimonials,
  layout = 'single',
  autoplay = true,
  showNavigation = true,
  showIndicators = true,
}: TestimonialCarouselProps) {
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = testimonials.length

  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % maxSteps)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoplay, maxSteps])

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % maxSteps)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps)
  }

  const renderTestimonial = (testimonial: Testimonial, index: number) => (
    <Card
      key={index}
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Quote Icon */}
        <FormatQuoteIcon
          sx={{
            fontSize: 48,
            color: 'primary.main',
            opacity: 0.2,
            mb: 2,
          }}
        />

        {/* Rating */}
        {testimonial.rating && (
          <Box sx={{ mb: 2 }}>
            <Rating value={testimonial.rating} readOnly precision={0.5} />
          </Box>
        )}

        {/* Quote */}
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            lineHeight: 1.8,
            mb: 3,
            flex: 1,
            fontSize: '1.125rem',
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </Typography>

        {/* Author */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {testimonial.authorImage && (
            <Avatar
              src={urlFor(testimonial.authorImage).width(80).height(80).url()}
              alt={testimonial.authorImage.alt || testimonial.author}
              sx={{
                width: 56,
                height: 56,
              }}
            />
          )}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {testimonial.author}
            </Typography>
            {testimonial.authorLocation && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {testimonial.authorLocation}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      {/* Title */}
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

      {/* Carousel Container */}
      <Box sx={{ position: 'relative' }}>
        {/* Navigation Arrows */}
        {showNavigation && testimonials.length > 1 && (
          <>
            <IconButton
              onClick={handleBack}
              sx={{
                position: 'absolute',
                left: { xs: -16, md: -56 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: { xs: -16, md: -56 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}

        {/* Testimonials */}
        <Box
          sx={{
            overflow: 'hidden',
            px: { xs: 3, md: 0 },
          }}
        >
          {layout === 'single' ? (
            // Single slide view
            <Box sx={{ minHeight: '300px' }}>
              {renderTestimonial(testimonials[activeStep], activeStep)}
            </Box>
          ) : (
            // Multiple visible (responsive grid)
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {testimonials.map((testimonial, index) =>
                renderTestimonial(testimonial, index)
              )}
            </Box>
          )}
        </Box>

        {/* Indicators */}
        {showIndicators && layout === 'single' && testimonials.length > 1 && (
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              bgcolor: 'transparent',
              justifyContent: 'center',
              mt: 3,
              '& .MuiMobileStepper-dot': {
                width: 12,
                height: 12,
              },
              '& .MuiMobileStepper-dotActive': {
                bgcolor: 'primary.main',
              },
            }}
            nextButton={<></>}
            backButton={<></>}
          />
        )}
      </Box>
    </Box>
  )
}
