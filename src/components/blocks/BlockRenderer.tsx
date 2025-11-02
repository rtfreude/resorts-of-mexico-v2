import Hero from '../content/Hero'
import PortableTextRenderer from '../portabletext/PortableTextRenderer'
import DestinationCard from '../content/DestinationCard'
import Quote from '../content/Quote'
import TextImage from '../content/TextImage'
import CardGrid from '../content/CardGrid'
import AccordionBlock from '../content/AccordionBlock'
import ImageGallery from '../content/ImageGallery'
import TwoColumnText from '../content/TwoColumnText'
import StatsBlock from '../content/StatsBlock'
import VideoBlock from '../content/VideoBlock'
import TabBlock from '../content/TabBlock'
import PricingCardBlock from '../content/PricingCardBlock'
import TestimonialCarousel from '../content/TestimonialCarousel'
import HeadingBlock from '../content/HeadingBlock'
import BannerAlert from '../content/BannerAlert'
import SpacerBlock from '../content/SpacerBlock'
import AmenitiesBlock from '../content/AmenitiesBlock'
import SectionWrapper from '../layout/SectionWrapper'
import MapBlock from '../content/MapBlock'
import WeatherBlock from '../content/WeatherBlock'
import PackageBlock from '../content/PackageBlock'
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

          case 'quoteBlock':
            return (
              <Section key={block._key || index}>
                <Quote
                  quote={block.quote}
                  author={block.author}
                  authorTitle={block.authorTitle}
                  authorImage={block.authorImage}
                  rating={block.rating}
                  style={block.style}
                  alignment={block.alignment}
                />
              </Section>
            )

          case 'textImageBlock':
            return (
              <Section key={block._key || index}>
                <TextImage
                  content={block.content}
                  image={block.image}
                  imagePosition={block.imagePosition}
                  imageSize={block.imageSize}
                  verticalAlign={block.verticalAlign}
                  imageStyle={block.imageStyle}
                  reverseOnMobile={block.reverseOnMobile}
                />
              </Section>
            )

          case 'cardGridBlock':
            return (
              <Section key={block._key || index} background="grey">
                <CardGrid
                  title={block.title}
                  cards={block.cards}
                  columns={block.columns}
                  cardStyle={block.cardStyle}
                  iconPosition={block.iconPosition}
                  textAlign={block.textAlign}
                />
              </Section>
            )

          case 'accordionBlock':
            return (
              <Section key={block._key || index}>
                <AccordionBlock
                  title={block.title}
                  items={block.items}
                  style={block.style}
                  allowMultiple={block.allowMultiple}
                  firstOpen={block.firstOpen}
                />
              </Section>
            )

          case 'imageGalleryBlock':
            return (
              <Section key={block._key || index}>
                <ImageGallery
                  title={block.title}
                  images={block.images}
                  layout={block.layout}
                  columns={block.columns}
                  gap={block.gap}
                  aspectRatio={block.aspectRatio}
                  showCaptions={block.showCaptions}
                  enableLightbox={block.enableLightbox}
                />
              </Section>
            )

          case 'twoColumnTextBlock':
            return (
              <Section key={block._key || index}>
                <TwoColumnText
                  leftColumn={block.leftColumn}
                  rightColumn={block.rightColumn}
                  columnRatio={block.columnRatio}
                  verticalAlign={block.verticalAlign}
                  gap={block.gap}
                />
              </Section>
            )

          case 'statsBlock':
            return (
              <Section key={block._key || index} background="grey">
                <StatsBlock
                  title={block.title}
                  stats={block.stats}
                  columns={block.columns}
                  style={block.style}
                  alignment={block.alignment}
                />
              </Section>
            )

          case 'videoBlock':
            return (
              <Section key={block._key || index}>
                <VideoBlock
                  title={block.title}
                  videoSource={block.videoSource}
                  url={block.url}
                  aspectRatio={block.aspectRatio}
                  caption={block.caption}
                  maxWidth={block.maxWidth}
                />
              </Section>
            )

          case 'tabBlock':
            return (
              <Section key={block._key || index}>
                <TabBlock
                  title={block.title}
                  tabs={block.tabs}
                  tabStyle={block.tabStyle}
                  tabAlignment={block.tabAlignment}
                />
              </Section>
            )

          case 'pricingCardBlock':
            return (
              <Section key={block._key || index}>
                <PricingCardBlock
                  title={block.title}
                  subtitle={block.subtitle}
                  cards={block.cards}
                  columns={block.columns}
                />
              </Section>
            )

          case 'testimonialCarouselBlock':
            return (
              <Section key={block._key || index} background="grey">
                <TestimonialCarousel
                  title={block.title}
                  testimonials={block.testimonials}
                  layout={block.layout}
                  autoplay={block.autoplay}
                  showNavigation={block.showNavigation}
                  showIndicators={block.showIndicators}
                />
              </Section>
            )

          case 'headingBlock':
            return (
              <Section key={block._key || index}>
                <HeadingBlock
                  text={block.text}
                  level={block.level}
                  alignment={block.alignment}
                  style={block.style}
                  spacing={block.spacing}
                />
              </Section>
            )

          case 'bannerAlertBlock':
            return (
              <BannerAlert
                key={block._key || index}
                message={block.message}
                type={block.type}
                showIcon={block.showIcon}
                dismissible={block.dismissible}
                cta={block.cta}
              />
            )

          case 'spacerBlock':
            return (
              <SpacerBlock
                key={block._key || index}
                height={block.height}
                customHeight={block.customHeight}
                dividerStyle={block.dividerStyle}
                dividerWidth={block.dividerWidth}
              />
            )

          case 'amenitiesBlock':
            return (
              <Section key={block._key || index}>
                <AmenitiesBlock
                  title={block.title}
                  amenities={block.amenities}
                  layout={block.layout}
                  columns={block.columns}
                  showIcons={block.showIcons}
                  showDescriptions={block.showDescriptions}
                />
              </Section>
            )

          case 'sectionWrapperBlock':
            return (
              <SectionWrapper
                key={block._key || index}
                backgroundColor={block.backgroundColor}
                paddingTop={block.paddingTop}
                paddingBottom={block.paddingBottom}
                containerWidth={block.containerWidth}
                addTopBorder={block.addTopBorder}
                addBottomBorder={block.addBottomBorder}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {block.content?.map((innerBlock: any, innerIndex: number) => {
                    // Recursively render nested blocks
                    return (
                      <BlockRenderer
                        key={innerBlock._key || innerIndex}
                        blocks={[innerBlock]}
                      />
                    )
                  })}
                </Box>
              </SectionWrapper>
            )

          case 'mapBlock':
            return (
              <Section key={block._key || index}>
                <MapBlock
                  title={block.title}
                  description={block.description}
                  mapType={block.mapType}
                  embedUrl={block.embedUrl}
                  staticImage={block.staticImage}
                  locations={block.locations}
                  height={block.height}
                  showLocationList={block.showLocationList}
                  locationListPosition={block.locationListPosition}
                  borderRadius={block.borderRadius}
                />
              </Section>
            )

          case 'weatherBlock':
            return (
              <Section key={block._key || index}>
                <WeatherBlock
                  title={block.title}
                  locationName={block.locationName}
                  monthlyData={block.monthlyData}
                  bestTimeToVisit={block.bestTimeToVisit}
                  displayStyle={block.displayStyle}
                  showMetrics={block.showMetrics}
                  backgroundColor={block.backgroundColor}
                />
              </Section>
            )

          case 'packageBlock':
            return (
              <Section key={block._key || index}>
                <PackageBlock
                  title={block.title}
                  subtitle={block.subtitle}
                  packages={block.packages}
                  layout={block.layout}
                  columns={block.columns}
                />
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
