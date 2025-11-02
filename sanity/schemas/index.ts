// Import all schema types here
// This will be the central place to import all content types

// Documents
import globalSettings from './documents/globalSettings'
import destination from './documents/destination'
import article from './documents/article'
import author from './documents/author'
import category from './documents/category'
import tag from './documents/tag'
import navigation from './documents/navigation'
import page from './documents/page'

// Objects
import cta from './objects/cta'

// Blocks
import heroBlock from './blocks/heroBlock'
import textBlock from './blocks/textBlock'
import imageBlock from './blocks/imageBlock'
import destinationGridBlock from './blocks/destinationGridBlock'
import ctaBlock from './blocks/ctaBlock'
import quoteBlock from './blocks/quoteBlock'
import textImageBlock from './blocks/textImageBlock'
import cardGridBlock from './blocks/cardGridBlock'
import accordionBlock from './blocks/accordionBlock'
import imageGalleryBlock from './blocks/imageGalleryBlock'
import twoColumnTextBlock from './blocks/twoColumnTextBlock'
import statsBlock from './blocks/statsBlock'
import videoBlock from './blocks/videoBlock'
import tabBlock from './blocks/tabBlock'
import pricingCardBlock from './blocks/pricingCardBlock'
import testimonialCarouselBlock from './blocks/testimonialCarouselBlock'
import headingBlock from './blocks/headingBlock'
import bannerAlertBlock from './blocks/bannerAlertBlock'
import spacerBlock from './blocks/spacerBlock'
import amenitiesBlock from './blocks/amenitiesBlock'
import sectionWrapperBlock from './blocks/sectionWrapperBlock'
import mapBlock from './blocks/mapBlock'
import weatherBlock from './blocks/weatherBlock'
import packageBlock from './blocks/packageBlock'

// Export all schemas
export const schemaTypes = [
  // Singleton documents
  globalSettings,
  navigation,

  // Main content types
  destination,
  article,
  author,
  page,

  // Taxonomy
  category,
  tag,

  // Reusable objects
  cta,

  // Content blocks
  heroBlock,
  textBlock,
  imageBlock,
  destinationGridBlock,
  ctaBlock,
  quoteBlock,
  textImageBlock,
  cardGridBlock,
  accordionBlock,
  imageGalleryBlock,
  twoColumnTextBlock,
  statsBlock,
  videoBlock,
  tabBlock,
  pricingCardBlock,
  testimonialCarouselBlock,
  headingBlock,
  bannerAlertBlock,
  spacerBlock,
  amenitiesBlock,
  sectionWrapperBlock,
  mapBlock,
  weatherBlock,
  packageBlock,
]
