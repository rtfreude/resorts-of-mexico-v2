import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Avatar,
} from '@mui/material'
import Link from 'next/link'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { urlFor } from '@/lib/sanity.image'
import { format } from 'date-fns'

interface ArticleCardProps {
  title: string
  slug: string
  excerpt: string
  featuredImage: any
  author?: {
    name: string
    profileImage?: any
  }
  publishedAt: string
  categories?: Array<{
    title: string
    slug: { current: string }
    color?: { hex: string }
  }>
  readingTime?: number
  featured?: boolean
}

export default function ArticleCard({
  title,
  slug,
  excerpt,
  featuredImage,
  author,
  publishedAt,
  categories,
  readingTime,
  featured,
}: ArticleCardProps) {
  const imageUrl = featuredImage ? urlFor(featuredImage).width(600).height(400).url() : null
  const authorImageUrl = author?.profileImage
    ? urlFor(author.profileImage).width(50).height(50).url()
    : null

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl || '/placeholder-article.jpg'}
          alt={featuredImage?.alt || title}
          sx={{ objectFit: 'cover' }}
        />
        {featured && (
          <Chip
            label="Featured"
            color="secondary"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Categories */}
        {categories && categories.length > 0 && (
          <Box sx={{ mb: 1 }}>
            {categories.slice(0, 2).map((category) => (
              <Chip
                key={category.slug.current}
                label={category.title}
                size="small"
                sx={{
                  mr: 0.5,
                  mb: 0.5,
                  backgroundColor: category.color?.hex || 'primary.main',
                  color: 'white',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        )}

        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {excerpt}
        </Typography>

        {/* Meta Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {author && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={authorImageUrl || undefined} sx={{ width: 24, height: 24 }}>
                {author.name.charAt(0)}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {author.name}
              </Typography>
            </Box>
          )}
          <Typography variant="caption" color="text.secondary">
            {format(new Date(publishedAt), 'MMM d, yyyy')}
          </Typography>
          {readingTime && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {readingTime} min
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          href={`/blog/${slug}`}
          variant="outlined"
          fullWidth
          sx={{ textTransform: 'none' }}
        >
          Read Article
        </Button>
      </CardActions>
    </Card>
  )
}
