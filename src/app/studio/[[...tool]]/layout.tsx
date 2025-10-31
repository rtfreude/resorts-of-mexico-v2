export const metadata = {
  title: 'Sanity Studio - Resort of Mexico',
  description: 'Content management for Resort of Mexico',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
