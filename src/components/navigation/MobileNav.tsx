'use client'

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Collapse,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { useState } from 'react'
import { GlobalSettings } from '@/lib/sanity.queries'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  navigation?: any
  settings: GlobalSettings | null
}

export default function MobileNav({ open, onClose, navigation, settings }: MobileNavProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const handleExpandClick = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  const defaultMenu = [
    { title: 'Home', customPath: '/' },
    { title: 'Destinations', customPath: '/destinations' },
    { title: 'Blog', customPath: '/blog' },
  ]

  const menuItems = navigation?.mainMenu || defaultMenu

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '80%',
          maxWidth: 360,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {settings?.title || 'Menu'}
          </Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List sx={{ flexGrow: 1, py: 0 }}>
          {menuItems.map((item: any, index: number) => {
            if (item.linkType === 'dropdown') {
              return (
                <Box key={index}>
                  <ListItemButton onClick={() => handleExpandClick(`menu-${index}`)}>
                    <ListItemText primary={item.title} />
                    {expandedMenu === `menu-${index}` ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={expandedMenu === `menu-${index}`}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.dropdownItems?.map((dropdownItem: any, dropIndex: number) => (
                        <ListItemButton
                          key={dropIndex}
                          component={dropdownItem.linkType === 'external' ? 'a' : Link}
                          href={
                            dropdownItem.linkType === 'external'
                              ? dropdownItem.externalUrl
                              : dropdownItem.customPath ||
                                `/${dropdownItem.internalLink?._type}/${dropdownItem.internalLink?.slug?.current}`
                          }
                          target={
                            dropdownItem.linkType === 'external' ? '_blank' : undefined
                          }
                          rel={
                            dropdownItem.linkType === 'external'
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          onClick={onClose}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText primary={dropdownItem.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                  <Divider />
                </Box>
              )
            }

            // Regular link
            const href =
              item.linkType === 'external'
                ? item.externalUrl
                : item.customPath ||
                  `/${item.internalLink?._type}/${item.internalLink?.slug?.current}`

            return (
              <Box key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={item.linkType === 'external' ? 'a' : Link}
                    href={href}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}
