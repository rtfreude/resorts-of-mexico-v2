import { defineType } from 'sanity'
import { MdFormatQuote } from 'react-icons/md'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  icon: MdFormatQuote,
  fields: [
    {
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorTitle',
      title: 'Author Title/Role',
      type: 'string',
      description: 'e.g., "Guest from California" or "Travel Blogger"',
    },
    {
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    },
    {
      name: 'rating',
      title: 'Rating (Optional)',
      type: 'number',
      description: 'Star rating from 1-5',
      validation: (Rule) => Rule.min(1).max(5).precision(1),
    },
    {
      name: 'style',
      title: 'Quote Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Featured (Boxed)', value: 'featured' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
      },
      initialValue: 'center',
    },
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      media: 'authorImage',
    },
    prepare({ quote, author, media }) {
      return {
        title: `"${quote.substring(0, 60)}${quote.length > 60 ? '...' : ''}"`,
        subtitle: `— ${author}`,
        media,
      }
    },
  },
})
