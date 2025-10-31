'use client'

import { Button, ButtonProps } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

interface AffiliateButtonProps extends Omit<ButtonProps, 'href'> {
  href: string
  text: string
  tracking?: boolean
}

export default function AffiliateButton({
  href,
  text,
  tracking = true,
  variant = 'contained',
  ...props
}: AffiliateButtonProps) {
  const handleClick = () => {
    if (tracking && typeof window !== 'undefined') {
      // Track affiliate link click (can integrate with analytics later)
      console.log('Affiliate link clicked:', href)

      // Example: Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', 'affiliate_click', {
          link_url: href,
          link_text: text,
        })
      }
    }
  }

  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      variant={variant}
      endIcon={<OpenInNewIcon />}
      onClick={handleClick}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        ...props.sx,
      }}
      {...props}
    >
      {text}
    </Button>
  )
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
