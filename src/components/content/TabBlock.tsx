'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PortableTextRenderer from '../portabletext/PortableTextRenderer'

interface TabItem {
  tabTitle: string
  content: any[]
}

interface TabBlockProps {
  title?: string
  tabs: TabItem[]
  tabStyle?: 'standard' | 'scrollable'
  tabAlignment?: 'left' | 'center'
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 4 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function TabBlock({
  title,
  tabs,
  tabStyle = 'standard',
  tabAlignment = 'center',
}: TabBlockProps) {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      {/* Section Title */}
      {title && (
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={tabStyle}
          centered={tabAlignment === 'center' && tabStyle === 'standard'}
          scrollButtons={tabStyle === 'scrollable' ? 'auto' : false}
          sx={{
            ...(tabAlignment === 'left' && tabStyle === 'standard' && {
              '& .MuiTabs-flexContainer': {
                justifyContent: 'flex-start',
              },
            }),
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.tabTitle}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minWidth: 120,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <PortableTextRenderer value={tab.content} />
        </TabPanel>
      ))}
    </Box>
  )
}
