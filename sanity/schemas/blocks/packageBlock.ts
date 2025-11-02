import { defineField, defineType } from 'sanity'
import { MdCardTravel } from 'react-icons/md'

export default defineType({
  name: 'packageBlock',
  title: 'Travel Package',
  type: 'object',
  icon: MdCardTravel,
  description: 'Showcase travel packages with itineraries and pricing',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading above the packages',
      initialValue: 'Travel Packages',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional description text',
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      description: 'Travel packages to display',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'packageName',
              title: 'Package Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'tagline',
              title: 'Tagline',
              type: 'string',
              description: 'Short description (e.g., "All-Inclusive Paradise")',
            },
            {
              name: 'image',
              title: 'Package Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "5 Days / 4 Nights"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Starting Price',
              type: 'number',
              description: 'Price per person',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'priceNote',
              title: 'Price Note',
              type: 'string',
              description: 'e.g., "per person"',
              initialValue: 'per person',
            },
            {
              name: 'featured',
              title: 'Featured Package',
              type: 'boolean',
              description: 'Highlight this package with a badge',
              initialValue: false,
            },
            {
              name: 'highlights',
              title: 'Package Highlights',
              type: 'array',
              description: 'Key features and inclusions',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.max(10),
            },
            {
              name: 'itinerary',
              title: 'Itinerary',
              type: 'array',
              description: 'Day-by-day breakdown',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'day',
                      title: 'Day Number',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(1),
                    },
                    {
                      name: 'title',
                      title: 'Day Title',
                      type: 'string',
                      description: 'e.g., "Arrival & Welcome"',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 3,
                    },
                  ],
                  preview: {
                    select: {
                      day: 'day',
                      title: 'title',
                    },
                    prepare({ day, title }) {
                      return {
                        title: `Day ${day}: ${title}`,
                      }
                    },
                  },
                },
              ],
            },
            {
              name: 'included',
              title: 'What\'s Included',
              type: 'array',
              description: 'Items included in the package',
              of: [{ type: 'string' }],
            },
            {
              name: 'notIncluded',
              title: 'What\'s Not Included',
              type: 'array',
              description: 'Items not included',
              of: [{ type: 'string' }],
            },
            {
              name: 'bookingUrl',
              title: 'Booking URL',
              type: 'url',
              description: 'Link to booking page or inquiry form',
            },
            {
              name: 'bookingText',
              title: 'Booking Button Text',
              type: 'string',
              initialValue: 'Book Now',
            },
          ],
          preview: {
            select: {
              title: 'packageName',
              subtitle: 'duration',
              media: 'image',
              price: 'price',
            },
            prepare({ title, subtitle, media, price }) {
              return {
                title,
                subtitle: `${subtitle} • From $${price}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      description: 'How to display the packages',
      options: {
        list: [
          { title: 'Cards', value: 'cards' },
          { title: 'Detailed List', value: 'list' },
          { title: 'Comparison Table', value: 'comparison' },
        ],
        layout: 'radio',
      },
      initialValue: 'cards',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'string',
      description: 'Number of packages per row (cards layout only)',
      options: {
        list: [
          { title: '1 Column', value: '1' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
      hidden: ({ parent }) => parent?.layout !== 'cards',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      packageCount: 'packages.length',
      layout: 'layout',
    },
    prepare(selection) {
      const { title, packageCount, layout } = selection
      return {
        title: title || 'Travel Packages',
        subtitle: `${packageCount || 0} packages • ${layout} layout`,
        media: MdCardTravel,
      }
    },
  },
})
