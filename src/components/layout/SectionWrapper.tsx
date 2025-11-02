import React from 'react'
import { Box, Container } from '@mui/material'

interface SectionWrapperProps {
  title?: string
  content?: any[]
  backgroundColor?: string
  paddingTop?: string
  paddingBottom?: string
  containerWidth?: 'full' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  addTopBorder?: boolean
  addBottomBorder?: boolean
  children?: React.ReactNode
}

export default function SectionWrapper({
  backgroundColor = 'transparent',
  paddingTop = '6',
  paddingBottom = '6',
  containerWidth = 'lg',
  addTopBorder = false,
  addBottomBorder = false,
  children,
}: SectionWrapperProps) {
  // Convert padding strings to numbers
  const ptValue = parseInt(paddingTop, 10) || 6
  const pbValue = parseInt(paddingBottom, 10) || 6

  // Determine background styling
  const getBackgroundStyle = () => {
    if (backgroundColor === 'gradient') {
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    }
    if (backgroundColor === 'transparent') {
      return {}
    }
    return {
      bgcolor: backgroundColor,
    }
  }

  // Border styles
  const borderStyle = {
    content: '""',
    display: 'block',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    mx: 'auto',
    maxWidth: '120px',
  }

  // Render content based on whether using children or content prop
  const renderContent = () => {
    if (children) {
      return children
    }
    // This will be handled by BlockRenderer when used in page context
    return null
  }

  return (
    <Box
      component="section"
      sx={{
        ...getBackgroundStyle(),
        pt: ptValue,
        pb: pbValue,
        position: 'relative',
      }}
    >
      {addTopBorder && (
        <Box
          sx={{
            ...borderStyle,
            mb: ptValue > 0 ? 4 : 0,
          }}
        />
      )}

      {containerWidth === 'full' ? (
        <Box sx={{ width: '100%' }}>
          {renderContent()}
        </Box>
      ) : (
        <Container maxWidth={containerWidth}>
          {renderContent()}
        </Container>
      )}

      {addBottomBorder && (
        <Box
          sx={{
            ...borderStyle,
            mt: pbValue > 0 ? 4 : 0,
          }}
        />
      )}
    </Box>
  )
}
