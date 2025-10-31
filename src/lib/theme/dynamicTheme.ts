import { createTheme, ThemeOptions } from '@mui/material/styles'
import { GlobalSettings } from '../sanity.queries'
import { defaultThemeOptions } from './index'

/**
 * Generate a Material UI theme from Sanity Global Settings
 */
export function createThemeFromSettings(
  settings: GlobalSettings | null
): ThemeOptions {
  // If no settings, return default theme
  if (!settings) {
    return defaultThemeOptions
  }

  // Start with default theme options
  const themeOptions: ThemeOptions = { ...defaultThemeOptions }

  // Apply primary color if set
  if (settings.primaryColor?.hex) {
    themeOptions.palette = {
      ...themeOptions.palette,
      primary: {
        main: settings.primaryColor.hex,
      },
    }
  }

  // Apply secondary color if set
  if (settings.secondaryColor?.hex) {
    themeOptions.palette = {
      ...themeOptions.palette,
      secondary: {
        main: settings.secondaryColor.hex,
      },
    }
  }

  // Apply font family if set
  if (settings.fontFamily) {
    themeOptions.typography = {
      ...themeOptions.typography,
      fontFamily: `"${settings.fontFamily}", "Roboto", "Helvetica", "Arial", sans-serif`,
    }
  }

  return themeOptions
}

/**
 * Create a full MUI theme from Sanity settings
 */
export function createDynamicTheme(settings: GlobalSettings | null) {
  const themeOptions = createThemeFromSettings(settings)
  return createTheme(themeOptions)
}
