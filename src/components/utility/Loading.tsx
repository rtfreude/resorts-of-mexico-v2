import { Box, CircularProgress, Skeleton, Stack } from '@mui/material'

interface LoadingProps {
  type?: 'spinner' | 'card' | 'article' | 'page'
  count?: number
}

export default function Loading({ type = 'spinner', count = 1 }: LoadingProps) {
  if (type === 'spinner') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <Box key={index}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1, mb: 1 }} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height={36} sx={{ mt: 1, borderRadius: 1 }} />
          </Box>
        ))}
      </>
    )
  }

  if (type === 'article') {
    return (
      <Stack spacing={2}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width="60%" height={48} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="90%" />
      </Stack>
    )
  }

  if (type === 'page') {
    return (
      <Stack spacing={3} sx={{ p: 3 }}>
        <Skeleton variant="text" width="40%" height={60} />
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </Stack>
    )
  }

  return null
}
