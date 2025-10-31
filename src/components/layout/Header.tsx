'use client'

import { AppBar, Toolbar, Box, IconButton, useScrollTrigger } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { GlobalSettings } from '@/lib/sanity.queries'
import Container from './Container'
import MobileNav from '../navigation/MobileNav'
import MainNav from '../navigation/MainNav'

interface HeaderProps {
  settings: GlobalSettings | null
  navigation?: any // Will be typed properly when we create navigation queries
}

export default function Header({ settings, navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {settings?.logo?.asset?.url ? (
                <Image
                  src={settings.logo.asset.url}
                  alt={settings.logo.alt || settings.title || 'Logo'}
                  width={150}
                  height={50}
                  style={{ height: 'auto', maxHeight: '50px' }}
                  priority
                />
              ) : (
                <Box
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  {settings?.title || 'Resort of Mexico'}
                </Box>
              )}
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <MainNav navigation={navigation} />
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleMobileMenuToggle}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        navigation={navigation}
        settings={settings}
      />
    </>
  )
}
