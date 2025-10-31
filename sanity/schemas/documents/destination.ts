import { defineField, defineType } from 'sanity'
import { MdPlace } from 'react-icons/md'

export default defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  icon: MdPlace,
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'The name of the destination (e.g., "Cancun", "Puerto Vallarta")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the name (auto-generated)',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief description for cards and previews (150-200 characters)',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().max(500),
      description: 'Detailed description of the destination',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      description: 'Additional images for the destination',
    }),
    defineField({
      name: 'location',
      title: 'Location Information',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State/Region',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'region',
          title: 'Tourism Region',
          type: 'string',
          options: {
            list: [
              { title: 'Caribbean Coast', value: 'caribbean' },
              { title: 'Pacific Coast', value: 'pacific' },
              { title: 'Gulf Coast', value: 'gulf' },
              { title: 'Central Mexico', value: 'central' },
              { title: 'Northern Mexico', value: 'northern' },
              { title: 'Southern Mexico', value: 'southern' },
              { title: 'Baja Peninsula', value: 'baja' },
            ],
          },
          description: 'General tourism region for filtering',
        },
        {
          name: 'coordinates',
          title: 'GPS Coordinates',
          type: 'geopoint',
          description: 'Used for maps and location-based features',
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights & Attractions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Highlight Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: '🏖️ Beach', value: 'beach' },
                  { title: '🏛️ Historical', value: 'historical' },
                  { title: '🍽️ Dining', value: 'dining' },
                  { title: '🎭 Culture', value: 'culture' },
                  { title: '🏄 Adventure', value: 'adventure' },
                  { title: '🌊 Water Sports', value: 'watersports' },
                  { title: '🌴 Nature', value: 'nature' },
                  { title: '🛍️ Shopping', value: 'shopping' },
                  { title: '🌙 Nightlife', value: 'nightlife' },
                  { title: '👨‍👩‍👧‍👦 Family', value: 'family' },
                ],
              },
            },
          ],
        },
      ],
      description: 'Key attractions and activities',
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'object',
      fields: [
        {
          name: 'seasons',
          title: 'Recommended Seasons',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Spring (Mar-May)', value: 'spring' },
                  { title: 'Summer (Jun-Aug)', value: 'summer' },
                  { title: 'Fall (Sep-Nov)', value: 'fall' },
                  { title: 'Winter (Dec-Feb)', value: 'winter' },
                ],
              },
            },
          ],
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Explain why these seasons are best',
        },
      ],
    }),
    defineField({
      name: 'weather',
      title: 'Weather Information',
      type: 'object',
      fields: [
        {
          name: 'averageTempHigh',
          title: 'Average High Temperature (°F)',
          type: 'number',
        },
        {
          name: 'averageTempLow',
          title: 'Average Low Temperature (°F)',
          type: 'number',
        },
        {
          name: 'rainySeasonMonths',
          title: 'Rainy Season Months',
          type: 'string',
          description: 'e.g., "June to October"',
        },
        {
          name: 'hurricaneSeason',
          title: 'Hurricane Season',
          type: 'boolean',
          description: 'Is this destination affected by hurricane season?',
        },
      ],
    }),
    defineField({
      name: 'relatedDestinations',
      title: 'Related Destinations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'destination' }],
        },
      ],
      description: 'Other destinations visitors might be interested in',
    }),
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Custom title for search engines (leave blank to use destination name)',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: 'Description for search results (150-160 characters)',
        },
        {
          name: 'keywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Target keywords for SEO',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Custom image for social media (uses hero image if not set)',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    // Affiliate overrides
    defineField({
      name: 'affiliateLinks',
      title: 'Affiliate Link Overrides',
      type: 'object',
      fields: [
        {
          name: 'bookingUrl',
          title: 'Booking.com URL',
          type: 'url',
          description: 'Specific affiliate link for hotels in this destination',
        },
        {
          name: 'expediaUrl',
          title: 'Expedia URL',
          type: 'url',
        },
        {
          name: 'viatorUrl',
          title: 'Viator Tours URL',
          type: 'url',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Destination',
      type: 'boolean',
      description: 'Show this destination on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this destination was first published',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location.state',
      media: 'heroImage',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, media, featured } = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: subtitle ? `${subtitle}, Mexico` : 'Mexico',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Recently Published',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
})
