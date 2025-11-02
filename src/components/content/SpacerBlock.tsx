import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

interface SpacerBlockProps {
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  customHeight?: number
  dividerStyle?: 'none' | 'solid' | 'dashed' | 'dotted'
  dividerWidth?: 'full' | 'contained' | 'short'
}

export default function SpacerBlock({
  height = 'md',
  customHeight,
  dividerStyle = 'none',
  dividerWidth = 'full',
}: SpacerBlockProps) {
  // Height mapping
  const heightMap = {
    xs: 1, // 8px
    sm: 2, // 16px  
    md: 4, // 32px
    lg: 6, // 48px
    xl: 8, // 64px
    custom: customHeight ? customHeight / 8 : 4, // Convert px to theme spacing units
  }

  const spacingValue = heightMap[height]

  // Max width mapping
  const maxWidthMap = {
    full: '100%',
    contained: '800px',
    short: '200px',
  }

  if (dividerStyle === 'none') {
    return <Box sx={{ height: spacingValue }} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: spacingValue,
        width: '100%',
      }}
    >
      <Divider
        sx={{
          width: '100%',
          maxWidth: maxWidthMap[dividerWidth],
          mx: 'auto',
          borderStyle: dividerStyle,
          ...(dividerStyle === 'dashed' && {
            borderWidth: 2,
          }),
          ...(dividerStyle === 'dotted' && {
            borderWidth: 2,
          }),
        }}
      />
    </Box>
  )
}
