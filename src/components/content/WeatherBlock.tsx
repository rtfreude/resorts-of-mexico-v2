import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import OpacityIcon from '@mui/icons-material/Opacity'
import WaterDropIcon from '@mui/icons-material/WaterDrop'

interface MonthData {
  month: string
  highTemp: number
  lowTemp: number
  rainfall?: number
  rainyDays?: number
  humidity?: number
  _key?: string
}

interface BestTime {
  months?: string
  description?: string
}

interface ShowMetrics {
  temperature?: boolean
  rainfall?: boolean
  rainyDays?: boolean
  humidity?: boolean
}

interface WeatherBlockProps {
  title?: string
  locationName: string
  monthlyData: MonthData[]
  bestTimeToVisit?: BestTime
  displayStyle?: 'chart' | 'table' | 'cards'
  showMetrics?: ShowMetrics
  backgroundColor?: string
}

export default function WeatherBlock({
  title = 'Climate & Weather',
  locationName,
  monthlyData = [],
  bestTimeToVisit,
  displayStyle = 'chart',
  showMetrics = { temperature: true, rainfall: true },
  backgroundColor = 'lightblue',
}: WeatherBlockProps) {
  const getBackgroundColor = () => {
    switch (backgroundColor) {
      case 'lightblue':
        return 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'
      case 'grey':
        return 'grey.50'
      case 'white':
        return 'white'
      case 'gradient':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      default:
        return 'grey.50'
    }
  }

  const ChartView = () => {
    const maxTemp = Math.max(...monthlyData.map((m) => m.highTemp))
    const minTemp = Math.min(...monthlyData.map((m) => m.lowTemp))
    const tempRange = maxTemp - minTemp

    return (
      <Box>
        {/* Temperature Chart */}
        {showMetrics?.temperature && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WbSunnyIcon color="warning" />
              Temperature Range
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {monthlyData.map((data, index) => {
                const barHeight = tempRange > 0 ? ((data.highTemp - data.lowTemp) / tempRange) * 100 : 50
                return (
                  <Box key={data._key || index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ minWidth: 100, fontWeight: 600 }}>
                      {data.month.substring(0, 3)}
                    </Typography>
                    <Box sx={{ flex: 1, position: 'relative', height: 32 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          height: '100%',
                          width: `${barHeight}%`,
                          bgcolor: 'warning.main',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          px: 1,
                          minWidth: 80,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                          {data.highTemp}° / {data.lowTemp}°
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        )}

        {/* Rainfall Chart */}
        {showMetrics?.rainfall && monthlyData.some((m) => m.rainfall !== undefined) && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <OpacityIcon color="info" />
              Monthly Rainfall
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {monthlyData.map((data, index) => {
                const maxRainfall = Math.max(...monthlyData.map((m) => m.rainfall || 0))
                const barWidth = maxRainfall > 0 ? ((data.rainfall || 0) / maxRainfall) * 100 : 0
                return (
                  <Box key={data._key || index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ minWidth: 100, fontWeight: 600 }}>
                      {data.month.substring(0, 3)}
                    </Typography>
                    <Box sx={{ flex: 1, position: 'relative', height: 24 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          height: '100%',
                          width: `${Math.max(barWidth, 5)}%`,
                          bgcolor: 'info.main',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          px: 1,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                          {data.rainfall || 0}&rdquo;
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        )}
      </Box>
    )
  }

  const TableView = () => (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Month</TableCell>
            {showMetrics?.temperature && <TableCell align="center" sx={{ fontWeight: 700 }}>High / Low</TableCell>}
            {showMetrics?.rainfall && <TableCell align="center" sx={{ fontWeight: 700 }}>Rainfall</TableCell>}
            {showMetrics?.rainyDays && <TableCell align="center" sx={{ fontWeight: 700 }}>Rainy Days</TableCell>}
            {showMetrics?.humidity && <TableCell align="center" sx={{ fontWeight: 700 }}>Humidity</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {monthlyData.map((data, index) => (
            <TableRow key={data._key || index} hover>
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {data.month}
              </TableCell>
              {showMetrics?.temperature && (
                <TableCell align="center">
                  {data.highTemp}°F / {data.lowTemp}°F
                </TableCell>
              )}
              {showMetrics?.rainfall && <TableCell align="center">{data.rainfall || 0}&rdquo;</TableCell>}
              {showMetrics?.rainyDays && <TableCell align="center">{data.rainyDays || 0}</TableCell>}
              {showMetrics?.humidity && <TableCell align="center">{data.humidity || 0}%</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const CardsView = () => (
    <Grid container spacing={2}>
      {monthlyData.map((data, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={data._key || index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {data.month.substring(0, 3)}
              </Typography>
              {showMetrics?.temperature && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h5" color="warning.main" sx={{ fontWeight: 700 }}>
                    {data.highTemp}°
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Low: {data.lowTemp}°F
                  </Typography>
                </Box>
              )}
              {showMetrics?.rainfall && data.rainfall !== undefined && (
                <Chip
                  icon={<WaterDropIcon />}
                  label={`${data.rainfall}&rdquo;`}
                  size="small"
                  color="info"
                  sx={{ mt: 1 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Box
      sx={{
        background: getBackgroundColor(),
        borderRadius: 2,
        p: { xs: 3, md: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {locationName}
        </Typography>
      </Box>

      {/* Best Time to Visit */}
      {bestTimeToVisit?.months && (
        <Card sx={{ mb: 4, bgcolor: 'success.light', color: 'success.contrastText' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🌟 Best Time to Visit: {bestTimeToVisit.months}
            </Typography>
            {bestTimeToVisit.description && (
              <Typography variant="body2">{bestTimeToVisit.description}</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Weather Data Display */}
      {displayStyle === 'chart' && <ChartView />}
      {displayStyle === 'table' && <TableView />}
      {displayStyle === 'cards' && <CardsView />}
    </Box>
  )
}
