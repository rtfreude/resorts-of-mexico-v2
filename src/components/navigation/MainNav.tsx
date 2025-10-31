'use client'

import { Button, Menu, MenuItem, Box } from '@mui/material'
import Link from 'next/link'
import { useState, MouseEvent } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface MainNavProps {
  navigation?: any
}

export default function MainNav({ navigation }: MainNavProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, menuId: string) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(menuId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setOpenMenu(null)
  }

  if (!navigation?.mainMenu) {
    // Default navigation fallback
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button component={Link} href="/" color="inherit">
          Home
        </Button>
        <Button component={Link} href="/destinations" color="inherit">
          Destinations
        </Button>
        <Button component={Link} href="/blog" color="inherit">
          Blog
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {navigation.mainMenu.map((item: any, index: number) => {
        if (item.linkType === 'dropdown') {
          return (
            <Box key={index}>
              <Button
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => handleMenuOpen(e, `menu-${index}`)}
                sx={{ textTransform: 'none' }}
              >
                {item.title}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={openMenu === `menu-${index}`}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {item.dropdownItems?.map((dropdownItem: any, dropIndex: number) => (
                  <MenuItem
                    key={dropIndex}
                    component={dropdownItem.linkType === 'external' ? 'a' : Link}
                    href={
                      dropdownItem.linkType === 'external'
                        ? dropdownItem.externalUrl
                        : dropdownItem.customPath ||
                          `/${dropdownItem.internalLink?._type}/${dropdownItem.internalLink?.slug?.current}`
                    }
                    target={dropdownItem.linkType === 'external' ? '_blank' : undefined}
                    rel={
                      dropdownItem.linkType === 'external' ? 'noopener noreferrer' : undefined
                    }
                    onClick={handleMenuClose}
                  >
                    {dropdownItem.title}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )
        }

        // Regular link
        const href =
          item.linkType === 'external'
            ? item.externalUrl
            : item.customPath || `/${item.internalLink?._type}/${item.internalLink?.slug?.current}`

        return (
          <Button
            key={index}
            component={item.linkType === 'external' ? 'a' : Link}
            href={href}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            {item.title}
          </Button>
        )
      })}
    </Box>
  )
}
