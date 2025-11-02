import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface VideoBlockProps {
  title?: string
  videoSource: 'youtube' | 'vimeo'
  url: string
  aspectRatio?: '16/9' | '4/3' | '21/9' | '1/1'
  caption?: string
  maxWidth?: 'small' | 'medium' | 'large' | 'full'
}

export default function VideoBlock({
  title,
  videoSource,
  url,
  aspectRatio = '16/9',
  caption,
  maxWidth = 'large',
}: VideoBlockProps) {
  // Extract video ID
  const getVideoId = () => {
    if (videoSource === 'youtube') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : null
    } else if (videoSource === 'vimeo') {
      const regExp = /vimeo.*\/(\d+)/i
      const match = url.match(regExp)
      return match ? match[1] : null
    }
    return null
  }

  const videoId = getVideoId()

  if (!videoId) {
    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: 'error.light',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography color="error">Invalid video URL</Typography>
      </Box>
    )
  }

  // Get embed URL
  const embedUrl =
    videoSource === 'youtube'
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://player.vimeo.com/video/${videoId}`

  // Calculate aspect ratio padding
  const getPaddingBottom = () => {
    switch (aspectRatio) {
      case '16/9':
        return '56.25%'
      case '4/3':
        return '75%'
      case '21/9':
        return '42.86%'
      case '1/1':
        return '100%'
      default:
        return '56.25%'
    }
  }

  // Max width mapping
  const maxWidthValue =
    maxWidth === 'small'
      ? '600px'
      : maxWidth === 'medium'
        ? '800px'
        : maxWidth === 'large'
          ? '1000px'
          : '100%'

  return (
    <Box
      sx={{
        maxWidth: maxWidthValue,
        mx: 'auto',
      }}
    >
      {/* Title */}
      {title && (
        <Typography
          variant="h3"
          component="h2"
          sx={{
            mb: 3,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Video Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: getPaddingBottom(),
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'grey.900',
          boxShadow: 3,
        }}
      >
        <Box
          component="iframe"
          src={embedUrl}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </Box>

      {/* Caption */}
      {caption && (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: 'center',
            color: 'text.secondary',
            fontStyle: 'italic',
          }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  )
}
