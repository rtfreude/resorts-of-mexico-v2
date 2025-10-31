import { Box, Grid, Typography, Link as MuiLink, Stack, IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import YouTubeIcon from '@mui/icons-material/YouTube'
import Link from 'next/link'
import { GlobalSettings } from '@/lib/sanity.queries'
import Container from './Container'

interface FooterProps {
  settings: GlobalSettings | null
  navigation?: any // Will be typed properly when we create navigation queries
}

export default function Footer({ settings, navigation }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const socialIcons: Record<string, any> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    pinterest: PinterestIcon,
    youtube: YouTubeIcon,
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'grey.100',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
              {settings?.title || 'Resort of Mexico'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
              {settings?.description || 'Discover amazing destinations across Mexico'}
            </Typography>

            {/* Social Media Icons */}
            {settings?.socialMedia && (
              <Stack direction="row" spacing={1}>
                {Object.entries(settings.socialMedia).map(([platform, url]) => {
                  if (!url) return null
                  const Icon = socialIcons[platform.toLowerCase()]
                  if (!Icon) return null

                  return (
                    <IconButton
                      key={platform}
                      component="a"
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'grey.400',
                        '&:hover': { color: 'primary.main' },
                      }}
                      aria-label={platform}
                    >
                      <Icon />
                    </IconButton>
                  )
                })}
              </Stack>
            )}
          </Grid>

          {/* Footer Navigation Columns */}
          {navigation?.footerMenu?.columns?.map((column: any, index: number) => (
            <Grid item xs={6} md={2} key={index}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: 'white', fontWeight: 700, mb: 2 }}
              >
                {column.title}
              </Typography>
              <Stack spacing={1}>
                {column.links?.map((link: any, linkIndex: number) => (
                  <MuiLink
                    key={linkIndex}
                    component={link.linkType === 'external' ? 'a' : Link}
                    href={
                      link.linkType === 'external'
                        ? link.externalUrl
                        : link.customPath || `/${link.internalLink?._type}/${link.internalLink?.slug?.current}`
                    }
                    target={link.linkType === 'external' ? '_blank' : undefined}
                    rel={link.linkType === 'external' ? 'noopener noreferrer' : undefined}
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.title}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Legal Links */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: 'white', fontWeight: 700, mb: 2 }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <MuiLink
                component={Link}
                href="/privacy-policy"
                sx={{
                  color: 'grey.400',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                component={Link}
                href="/terms"
                sx={{
                  color: 'grey.400',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                Terms of Service
              </MuiLink>
              <MuiLink
                component={Link}
                href="/affiliate-disclosure"
                sx={{
                  color: 'grey.400',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                Affiliate Disclosure
              </MuiLink>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.800',
            mt: 4,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {currentYear} {settings?.title || 'Resort of Mexico'}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
