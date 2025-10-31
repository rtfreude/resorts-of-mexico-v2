import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from '@mui/material'
import Link from 'next/link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { generateBreadcrumbSchema } from '@/lib/structuredData'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null

  // Convert items to the format expected by structured data
  const structuredDataItems = items.map((item) => ({
    name: item.label,
    url: item.href,
  }))

  // Generate structured data for breadcrumbs
  const structuredData = generateBreadcrumbSchema(structuredDataItems)

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Visual breadcrumbs */}
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return isLast ? (
            <Typography key={index} color="text.primary" sx={{ fontSize: '0.875rem' }}>
              {item.label}
            </Typography>
          ) : (
            <MuiLink
              key={index}
              component={Link}
              href={item.href}
              underline="hover"
              color="inherit"
              sx={{ fontSize: '0.875rem' }}
            >
              {item.label}
            </MuiLink>
          )
        })}
      </MuiBreadcrumbs>
    </>
  )
}
