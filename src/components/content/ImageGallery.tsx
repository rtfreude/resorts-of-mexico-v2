'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

interface GalleryImage {
  _key?: string
  alt: string
  caption?: string
  asset: {
    _ref: string
  }
}

interface ImageGalleryProps {
  title?: string
  images: GalleryImage[]
  layout?: 'grid' | 'masonry' | 'carousel'
  columns?: '2' | '3' | '4' | 'auto'
  gap?: 'small' | 'medium' | 'large'
  aspectRatio?: '1/1' | '4/3' | '16/9' | 'original'
  showCaptions?: boolean
  enableLightbox?: boolean
}

export default function ImageGallery({
  title,
  images,
  layout = 'grid',
  columns = '3',
  gap = 'medium',
  aspectRatio = '16/9',
  showCaptions = true,
  enableLightbox = true,
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number>(0)

  const handleImageClick = (index: number) => {
    if (enableLightbox) {
      setSelectedImage(index)
      setLightboxOpen(true)
    }
  }

  const handleClose = () => {
    setLightboxOpen(false)
  }

  // Gap spacing
  const gapSize = gap === 'small' ? 1 : gap === 'large' ? 4 : 2

  // Grid columns
  const gridColumns = {
    xs: 12,
    sm: 6,
    md: columns === 'auto' ? 4 : columns === '4' ? 3 : columns === '3' ? 4 : 6,
    lg: columns === 'auto' ? 3 : columns === '4' ? 3 : columns === '3' ? 4 : 6,
  }

  // Aspect ratio for grid
  const paddingBottom =
    aspectRatio === '1/1'
      ? '100%'
      : aspectRatio === '4/3'
        ? '75%'
        : aspectRatio === '16/9'
          ? '56.25%'
          : '66.67%'

  if (layout === 'carousel') {
    // Simple carousel implementation
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
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {/* For now, show first image - full carousel needs external library */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              borderRadius: 2,
              overflow: 'hidden',
              cursor: enableLightbox ? 'pointer' : 'default',
            }}
            onClick={() => handleImageClick(0)}
          >
            <Image
              src={urlFor(images[0]).width(1200).url()}
              alt={images[0].alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </Box>
          {showCaptions && images[0].caption && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary',
              }}
            >
              {images[0].caption}
            </Typography>
          )}
        </Box>
      </Box>
    )
  }

  // Grid or Masonry layout
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

      <Grid container spacing={gapSize}>
        {images.map((image, index) => (
          <Grid item key={image._key || index} {...gridColumns}>
            <Box
              sx={{
                cursor: enableLightbox ? 'pointer' : 'default',
                transition: 'transform 0.2s',
                '&:hover': enableLightbox
                  ? {
                      transform: 'scale(1.02)',
                    }
                  : {},
              }}
              onClick={() => handleImageClick(index)}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: layout === 'grid' ? paddingBottom : '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={urlFor(image).width(800).url()}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </Box>
              {showCaptions && image.caption && (
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 1,
                    color: 'text.secondary',
                  }}
                >
                  {image.caption}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Lightbox Dialog */}
      {enableLightbox && (
        <Dialog
          open={lightboxOpen}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              boxShadow: 'none',
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: '60vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '80vh',
              }}
            >
              <Image
                src={urlFor(images[selectedImage]).width(1920).url()}
                alt={images[selectedImage].alt}
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
              />
            </Box>
          </Box>
          {showCaptions && images[selectedImage].caption && (
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                textAlign: 'center',
                p: 2,
              }}
            >
              {images[selectedImage].caption}
            </Typography>
          )}
        </Dialog>
      )}
    </Box>
  )
}
