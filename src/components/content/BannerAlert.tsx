import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Collapse from '@mui/material/Collapse'

interface BannerAlertProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'promotion'
  showIcon?: boolean
  dismissible?: boolean
  cta?: {
    text: string
    linkType?: 'internal' | 'external' | 'affiliate'
    externalUrl?: string
    affiliateUrl?: string
    customPath?: string
    internalLink?: {
      _type: string
      slug: {
        current: string
      }
    }
  }
}

export default function BannerAlert({
  message,
  type = 'info',
  showIcon = true,
  dismissible = false,
  cta,
}: BannerAlertProps) {
  const [open, setOpen] = useState(true)

  // Get link URL
  const getLinkUrl = () => {
    if (!cta) return null
    if (cta.linkType === 'external') return cta.externalUrl
    if (cta.linkType === 'affiliate') return cta.affiliateUrl
    if (cta.customPath) return cta.customPath
    if (cta.internalLink) {
      return `/${cta.internalLink._type}/${cta.internalLink.slug.current}`
    }
    return null
  }

  // Map promotion to info severity for MUI
  const severity = type === 'promotion' ? 'info' : type

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        onClose={dismissible ? () => setOpen(false) : undefined}
        icon={showIcon ? undefined : false}
        sx={{
          borderRadius: 0,
          ...(type === 'promotion' && {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '& .MuiAlert-icon': {
              color: 'primary.contrastText',
            },
          }),
        }}
        action={
          cta && getLinkUrl() ? (
            <Button
              component={Link}
              href={getLinkUrl() || '#'}
              color="inherit"
              size="small"
              sx={{
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              {cta.text}
            </Button>
          ) : undefined
        }
      >
        {message}
      </Alert>
    </Collapse>
  )
}
