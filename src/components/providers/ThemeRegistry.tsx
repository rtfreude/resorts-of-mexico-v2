'use client'

import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createDynamicTheme } from '@/lib/theme/dynamicTheme'
import { GlobalSettings } from '@/lib/sanity.queries'
import theme from '@/lib/theme'

interface ThemeRegistryProps {
  children: React.ReactNode
  settings?: GlobalSettings | null
}

export default function ThemeRegistry({
  children,
  settings,
}: ThemeRegistryProps) {
  // Create theme based on Sanity settings or use default
  const dynamicTheme = React.useMemo(
    () => (settings ? createDynamicTheme(settings) : theme),
    [settings]
  )

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
