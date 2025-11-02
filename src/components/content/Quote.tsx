import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import { urlFor } from '@/lib/sanity.image'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

interface QuoteProps {
  quote: string
  author: string
  authorTitle?: string
  authorImage?: any
  rating?: number
  style?: 'default' | 'featured' | 'minimal'
  alignment?: 'left' | 'center'
}

export default function Quote({
  quote,
  author,
  authorTitle,
  authorImage,
  rating,
  style = 'default',
  alignment = 'center',
}: QuoteProps) {
  const isCenter = alignment === 'center'
  const isFeatured = style === 'featured'
  const isMinimal = style === 'minimal'

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '800px',
        mx: isCenter ? 'auto' : 0,
        px: isFeatured ? 4 : 3,
        py: isFeatured ? 4 : 3,
        textAlign: isCenter ? 'center' : 'left',
        ...(isFeatured && {
          backgroundColor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
          boxShadow: 1,
        }),
      }}
    >
      {/* Quote Icon for non-minimal styles */}
      {!isMinimal && (
        <FormatQuoteIcon
          sx={{
            fontSize: 48,
            color: 'primary.main',
            opacity: 0.2,
            mb: 2,
            ...(isCenter && { mx: 'auto', display: 'block' }),
          }}
        />
      )}

      {/* Quote Text */}
      <Typography
        variant="h5"
        component="blockquote"
        sx={{
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.6,
          mb: 3,
          color: 'text.primary',
          ...(isMinimal && {
            fontSize: '1.125rem',
          }),
          '&::before': {
            content: '"""',
            mr: 0.5,
          },
          '&::after': {
            content: '"""',
            ml: 0.5,
          },
        }}
      >
        {quote}
      </Typography>

      {/* Rating */}
      {rating && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: isCenter ? 'center' : 'flex-start',
            mb: 2,
          }}
        >
          <Rating value={rating} readOnly precision={0.5} />
        </Box>
      )}

      {/* Author Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCenter ? 'center' : 'flex-start',
          gap: 2,
        }}
      >
        {/* Author Image */}
        {authorImage && (
          <Avatar
            src={urlFor(authorImage).width(80).height(80).url()}
            alt={authorImage.alt || author}
            sx={{
              width: 56,
              height: 56,
              border: '2px solid',
              borderColor: 'grey.200',
            }}
          />
        )}

        {/* Author Info */}
        <Box sx={{ textAlign: isCenter ? 'center' : 'left' }}>
          <Typography
            variant="subtitle1"
            component="cite"
            sx={{
              fontStyle: 'normal',
              fontWeight: 600,
              display: 'block',
              color: 'text.primary',
            }}
          >
            {author}
          </Typography>
          {authorTitle && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                display: 'block',
              }}
            >
              {authorTitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
