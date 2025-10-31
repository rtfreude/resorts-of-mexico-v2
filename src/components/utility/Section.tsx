import { Box, BoxProps } from '@mui/material'
import Container from '../layout/Container'

interface SectionProps extends BoxProps {
  children: React.ReactNode
  contained?: boolean
  background?: 'default' | 'grey' | 'primary' | 'secondary'
}

export default function Section({
  children,
  contained = true,
  background = 'default',
  ...props
}: SectionProps) {
  const backgroundColors = {
    default: 'transparent',
    grey: 'grey.50',
    primary: 'primary.main',
    secondary: 'secondary.main',
  }

  const textColor = background === 'primary' || background === 'secondary' ? 'white' : 'inherit'

  const content = contained ? <Container>{children}</Container> : children

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: backgroundColors[background],
        color: textColor,
        ...props.sx,
      }}
      {...props}
    >
      {content}
    </Box>
  )
}
