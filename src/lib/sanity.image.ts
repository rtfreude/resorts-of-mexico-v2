import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './sanity.client'

/**
 * Initialize the Sanity image URL builder
 */
const builder = imageUrlBuilder(client)

/**
 * Helper function to generate Sanity image URLs with optimization
 *
 * @param source - Sanity image asset reference or image object
 * @returns Image URL builder instance
 *
 * @example
 * ```tsx
 * // Basic usage
 * const imageUrl = urlFor(image).width(800).height(600).url()
 *
 * // With quality and format
 * const optimizedUrl = urlFor(image)
 *   .width(1200)
 *   .height(630)
 *   .quality(80)
 *   .format('webp')
 *   .url()
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
