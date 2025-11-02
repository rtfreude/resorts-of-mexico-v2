import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import PortableTextRenderer from '../portabletext/PortableTextRenderer'

interface TextImageProps {
  content: any[]
  image: any
  imagePosition?: 'left' | 'right' | 'top' | 'bottom'
  imageSize?: '30' | '40' | '50' | '60'
  verticalAlign?: 'flex-start' | 'center' | 'flex-end'
  imageStyle?: 'rounded' | 'square' | 'shadow'
  reverseOnMobile?: boolean
}

export default function TextImage({
  content,
  image,
  imagePosition = 'right',
  imageSize = '50',
  verticalAlign = 'center',
  imageStyle = 'rounded',
  reverseOnMobile = false,
}: TextImageProps) {
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right'
  const imageSizePercent = parseInt(imageSize)
  const textSizePercent = 100 - imageSizePercent

  // Determine border radius
  const borderRadius = imageStyle === 'rounded' ? 2 : imageStyle === 'square' ? 0 : 2

  // Determine if shadow
  const boxShadow = imageStyle === 'shadow' ? 3 : 0

  // Image component
  const ImageComponent = (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: isHorizontal
          ? { xs: '300px', sm: '400px' }
          : { xs: '300px', sm: '400px', md: '500px' },
        borderRadius,
        overflow: 'hidden',
        boxShadow,
      }}
    >
      <Image
        src={urlFor(image).width(1200).url()}
        alt={image.alt || ''}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
    </Box>
  )

  // Text component
  const TextComponent = (
    <Box sx={{ width: '100%' }}>
      <PortableTextRenderer value={content} />
      {image.caption && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            color: 'text.secondary',
            fontStyle: 'italic',
          }}
        >
          {image.caption}
        </Typography>
      )}
    </Box>
  )

  // Horizontal layout (left/right)
  if (isHorizontal) {
    const flexDirection =
      imagePosition === 'left'
        ? reverseOnMobile
          ? { xs: 'column', md: 'row' }
          : { xs: 'column-reverse', md: 'row' }
        : reverseOnMobile
          ? { xs: 'column', md: 'row-reverse' }
          : { xs: 'column-reverse', md: 'row-reverse' }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection,
          gap: { xs: 3, md: 4 },
          alignItems: { xs: 'flex-start', md: verticalAlign },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: { xs: '0 0 100%', md: `0 0 ${imageSizePercent}%` },
            minWidth: 0,
          }}
        >
          {ImageComponent}
        </Box>

        {/* Text */}
        <Box
          sx={{
            flex: { xs: '0 0 100%', md: `0 0 ${textSizePercent}%` },
            minWidth: 0,
          }}
        >
          {TextComponent}
        </Box>
      </Box>
    )
  }

  // Vertical layout (top/bottom)
  const flexDirection =
    imagePosition === 'top'
      ? reverseOnMobile
        ? { xs: 'column-reverse', md: 'column' }
        : 'column'
      : reverseOnMobile
        ? 'column'
        : { xs: 'column-reverse', md: 'column' }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection,
        gap: 3,
      }}
    >
      {imagePosition === 'top' ? (
        <>
          {ImageComponent}
          {TextComponent}
        </>
      ) : (
        <>
          {TextComponent}
          {ImageComponent}
        </>
      )}
    </Box>
  )
}
