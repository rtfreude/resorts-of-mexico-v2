import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PortableTextRenderer from '../portabletext/PortableTextRenderer'

interface TwoColumnTextProps {
  leftColumn: any[]
  rightColumn: any[]
  columnRatio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70'
  verticalAlign?: 'flex-start' | 'center' | 'flex-end'
  gap?: 'small' | 'medium' | 'large'
}

export default function TwoColumnText({
  leftColumn,
  rightColumn,
  columnRatio = '50-50',
  verticalAlign = 'flex-start',
  gap = 'medium',
}: TwoColumnTextProps) {
  // Parse column ratio
  const [leftRatio, rightRatio] = columnRatio.split('-').map(Number)
  
  // Gap size mapping
  const gapSize = gap === 'small' ? 2 : gap === 'large' ? 6 : 4

  return (
    <Grid 
      container 
      spacing={gapSize}
      sx={{
        alignItems: verticalAlign,
      }}
    >
      <Grid item xs={12} md={leftRatio / 10 * 12}>
        <Box>
          <PortableTextRenderer value={leftColumn} />
        </Box>
      </Grid>
      <Grid item xs={12} md={rightRatio / 10 * 12}>
        <Box>
          <PortableTextRenderer value={rightColumn} />
        </Box>
      </Grid>
    </Grid>
  )
}
