import Hero from '../content/Hero'
import PortableTextRenderer from '../portabletext/PortableTextRenderer'
import DestinationCard from '../content/DestinationCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'
import Section from '../utility/Section'
import Container from '../layout/Container'

interface BlockRendererProps {
  blocks: any[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'heroBlock':
            return (
              <Hero
                key={block._key || index}
                title={block.title}
                subtitle={block.subtitle}
                image={block.backgroundImage}
                ctaText={block.cta?.text}
                ctaUrl={
                  block.cta?.linkType === 'external'
                    ? block.cta?.externalUrl
                    : block.cta?.linkType === 'affiliate'
                      ? block.cta?.affiliateUrl
                      : block.cta?.customPath ||
                        `/${block.cta?.internalLink?._type}/${block.cta?.internalLink?.slug?.current}`
                }
                height={block.height}
                overlay={block.overlay}
              />
            )

          case 'textBlock':
            return (
              <Section key={block._key || index}>
                <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                  <PortableTextRenderer value={block.content} />
                </Box>
              </Section>
            )

          case 'imageBlock':
            return (
              <Section key={block._key || index}>
                <Box
                  sx={{
                    maxWidth:
                      block.size === 'small'
                        ? '600px'
                        : block.size === 'medium'
                          ? '800px'
                          : block.size === 'large'
                            ? '1000px'
                            : '100%',
                    mx: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 0,
                      paddingBottom: '56.25%', // 16:9 aspect ratio
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={urlFor(block.image).width(1200).url()}
                      alt={block.image.alt || ''}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </Box>
                  {block.image.caption && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'center',
                        mt: 1,
                        color: 'text.secondary',
                      }}
                    >
                      {block.image.caption}
                    </Typography>
                  )}
                </Box>
              </Section>
            )

          case 'destinationGridBlock':
            return (
              <Section key={block._key || index} background="grey">
                {block.title && (
                  <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}
                  >
                    {block.title}
                  </Typography>
                )}
                <Grid container spacing={3}>
                  {block.destinations?.map((destination: any) => (
                    <Grid item xs={12} sm={6} md={12 / (block.columns || 3)} key={destination._id}>
                      <DestinationCard
                        name={destination.name}
                        slug={destination.slug.current}
                        shortDescription={destination.shortDescription}
                        heroImage={destination.heroImage}
                        location={destination.location}
                        featured={destination.featured}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Section>
            )

          case 'ctaBlock':
            return (
              <Section
                key={block._key || index}
                background={block.backgroundImage ? 'primary' : 'default'}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {block.backgroundImage && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 0,
                    }}
                  >
                    <Image
                      src={urlFor(block.backgroundImage).width(1920).url()}
                      alt={block.backgroundImage.alt || ''}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="100vw"
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
                    />
                  </Box>
                )}
                <Container>
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      textAlign: block.style === 'centered' ? 'center' : 'left',
                      color: block.backgroundImage ? 'white' : 'inherit',
                      maxWidth: '800px',
                      mx: block.style === 'centered' ? 'auto' : 0,
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: 700, mb: 2 }}
                    >
                      {block.title}
                    </Typography>
                    {block.subtitle && (
                      <Typography variant="h6" paragraph sx={{ mb: 4 }}>
                        {block.subtitle}
                      </Typography>
                    )}
                    {block.cta && (
                      <Button
                        component={Link}
                        href={
                          block.cta.linkType === 'external'
                            ? block.cta.externalUrl
                            : block.cta.linkType === 'affiliate'
                              ? block.cta.affiliateUrl
                              : block.cta.customPath ||
                                `/${block.cta.internalLink?._type}/${block.cta.internalLink?.slug?.current}`
                        }
                        variant="contained"
                        size="large"
                        sx={{ px: 4, py: 1.5 }}
                      >
                        {block.cta.text}
                      </Button>
                    )}
                  </Box>
                </Container>
              </Section>
            )

          default:
            console.warn('Unknown block type:', block._type)
            return null
        }
      })}
    </>
  )
}
