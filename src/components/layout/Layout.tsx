import { Box } from '@mui/material'
import { GlobalSettings } from '@/lib/sanity.queries'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  settings: GlobalSettings | null
  navigation?: any // Will be typed properly when we create navigation queries
}

export default function Layout({ children, settings, navigation }: LayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header settings={settings} navigation={navigation} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer settings={settings} navigation={navigation} />
    </Box>
  )
}
