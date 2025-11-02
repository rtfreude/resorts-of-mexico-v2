import Typography from '@mui/material/Typography'

interface HeadingBlockProps {
  text: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  alignment?: 'left' | 'center' | 'right'
  style?: 'default' | 'accent' | 'eyebrow'
  spacing?: 'none' | 'small' | 'medium' | 'large'
}

export default function HeadingBlock({
  text,
  level = 'h2',
  alignment = 'left',
  style = 'default',
  spacing = 'medium',
}: HeadingBlockProps) {
  // Spacing mapping
  const spacingMap = {
    none: { py: 0 },
    small: { py: 1 },
    medium: { py: 3 },
    large: { py: 5 },
  }

  return (
    <Typography
      variant={level}
      component={level}
      sx={{
        textAlign: alignment,
        fontWeight: style === 'eyebrow' ? 600 : 700,
        color: style === 'accent' ? 'primary.main' : 'text.primary',
        ...(style === 'eyebrow' && {
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.875rem',
        }),
        ...spacingMap[spacing],
      }}
    >
      {text}
    </Typography>
  )
}
