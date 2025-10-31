import { Container, Typography, Box, Card, CardContent, Chip, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '100vh', py: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Resort of Mexico
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Discover the best destinations across Mexico
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <CheckCircleIcon color="success" />
              <Typography variant="h5" component="h2">
                Project Initialized
              </Typography>
            </Stack>
            <Typography variant="body1" paragraph>
              Your Next.js application is ready! The development plan is being followed step by step.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
              <Chip label="Next.js 15" color="primary" />
              <Chip label="TypeScript" color="primary" />
              <Chip label="Material UI" color="secondary" />
              <Chip label="App Router" />
              <Chip label="Tailwind CSS" />
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Next Steps
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Phase 0: Project Foundation ✓<br />
              - Phase 1: Core Infrastructure Setup (in progress)<br />
              - Phase 2: Sanity CMS Architecture (upcoming)<br />
              - Phase 3: Dynamic Theming System (upcoming)
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
