import { PortableText } from '@portabletext/react'
import { Box, Typography, Alert } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

// Custom components for Portable Text
const components: any = {
  block: {
  h2: ({ children }: any) => (
      <Typography variant="h2" component="h2" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 700 }}>
        {children}
      </Typography>
    ),
  h3: ({ children }: any) => (
      <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 700 }}>
        {children}
      </Typography>
    ),
  h4: ({ children }: any) => (
      <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
  normal: ({ children }: any) => (
      <Typography variant="body1" paragraph sx={{ mb: 2, lineHeight: 1.8 }}>
        {children}
      </Typography>
    ),
  blockquote: ({ children }: any) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 3,
          py: 1,
          my: 3,
          fontStyle: 'italic',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {children}
        </Typography>
      </Box>
    ),
  },
  list: {
  bullet: ({ children }: any) => (
      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        {children}
      </Box>
    ),
  number: ({ children }: any) => (
      <Box component="ol" sx={{ pl: 4, mb: 2 }}>
        {children}
      </Box>
    ),
  },
  listItem: {
  bullet: ({ children }: any) => (
      <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
        {children}
      </Typography>
    ),
  number: ({ children }: any) => (
      <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
        {children}
      </Typography>
    ),
  },
  marks: {
  link: ({ children, value }: any) => {
      return (
        <Link
          href={value?.href || ''}
          target={value?.openInNewTab ? '_blank' : undefined}
          rel={
            value?.openInNewTab || value?.isAffiliate
              ? 'noopener noreferrer' + (value?.isAffiliate ? ' nofollow sponsored' : '')
              : undefined
          }
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            textDecorationColor: '#0066CC',
          }}
        >
          {children}
        </Link>
      )
    },
  internalLink: ({ children, value }: any) => {
      const href = value?.reference
        ? `/${value.reference._type}/${value.reference.slug?.current}`
        : '/'
      return (
        <Link
          href={href}
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            textDecorationColor: '#0066CC',
          }}
        >
          {children}
        </Link>
      )
    },
  strong: ({ children }: any) => <strong>{children}</strong>,
  em: ({ children }: any) => <em>{children}</em>,
  code: ({ children }: any) => (
      <Box
        component="code"
        sx={{
          backgroundColor: 'grey.100',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.875em',
        }}
      >
        {children}
      </Box>
    ),
  },
  types: {
  image: ({ value }: any) => {
      const imageUrl = urlFor(value).width(800).url()
      return (
        <Box sx={{ my: 4 }}>
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={800}
            height={600}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          {value.caption && (
            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', mt: 1, color: 'text.secondary' }}
            >
              {value.caption}
            </Typography>
          )}
        </Box>
      )
    },
  callout: ({ value }: any) => {
      const severityMap: Record<string, 'info' | 'warning' | 'error' | 'success'> = {
        info: 'info',
        tip: 'success',
        warning: 'warning',
        success: 'success',
      }

      return (
        <Alert severity={severityMap[value.type] || 'info'} sx={{ my: 3 }}>
          {value.title && (
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: value.content ? 1 : 0 }}>
              {value.title}
            </Typography>
          )}
          {value.content && <Typography variant="body2">{value.content}</Typography>}
        </Alert>
      )
    },
  youtube: ({ value }: any) => {
      const getYouTubeId = (url: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[7].length === 11 ? match[7] : null
      }

      const videoId = getYouTubeId(value.url)

      if (!videoId) {
        return null
      }

      return (
        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </Box>
          {value.caption && (
            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', mt: 1, color: 'text.secondary' }}
            >
              {value.caption}
            </Typography>
          )}
        </Box>
      )
    },
  },
}

interface PortableTextRendererProps {
  value: any
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />
}
