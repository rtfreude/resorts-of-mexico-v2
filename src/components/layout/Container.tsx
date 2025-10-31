import { Container as MuiContainer, ContainerProps } from '@mui/material'

interface CustomContainerProps extends ContainerProps {
  children: React.ReactNode
}

export default function Container({
  children,
  maxWidth = 'lg',
  ...props
}: CustomContainerProps) {
  return (
    <MuiContainer maxWidth={maxWidth} {...props}>
      {children}
    </MuiContainer>
  )
}
