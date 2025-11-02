import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PortableTextRenderer from '../portabletext/PortableTextRenderer'

interface AccordionItem {
  title: string
  content: any[]
}

interface AccordionBlockProps {
  title?: string
  items: AccordionItem[]
  style?: 'default' | 'bordered' | 'cards'
  allowMultiple?: boolean
  firstOpen?: boolean
}

export default function AccordionBlock({
  title,
  items,
  style = 'default',
  allowMultiple = false,
  firstOpen = true,
}: AccordionBlockProps) {
  const [expanded, setExpanded] = useState<string | false>(
    firstOpen ? 'panel0' : false
  )

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (allowMultiple) {
        // For multiple open, we'd need a different state structure
        // For now, single mode works with this approach
        setExpanded(isExpanded ? panel : false)
      } else {
        setExpanded(isExpanded ? panel : false)
      }
    }

  // Determine styling based on style prop
  const isCards = style === 'cards'
  const isBordered = style === 'bordered'

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

      {/* Accordion Items */}
      <Box
        sx={{
          maxWidth: '900px',
          mx: 'auto',
          ...(isCards && {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }),
        }}
      >
        {items.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            disableGutters={!isCards}
            elevation={isCards ? 2 : 0}
            sx={{
              ...(isCards && {
                borderRadius: 2,
                '&:before': {
                  display: 'none',
                },
              }),
              ...(isBordered && {
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
                '&:before': {
                  display: 'none',
                },
              }),
              ...(!isCards &&
                !isBordered && {
                  '&:before': {
                    backgroundColor: 'divider',
                  },
                }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                ...(isCards && {
                  px: 3,
                  py: 2,
                }),
                '& .MuiAccordionSummary-content': {
                  my: isCards ? 0 : 1.5,
                },
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                ...(isCards && {
                  px: 3,
                  pb: 3,
                }),
                pt: 0,
              }}
            >
              <PortableTextRenderer value={item.content} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}
