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
]
