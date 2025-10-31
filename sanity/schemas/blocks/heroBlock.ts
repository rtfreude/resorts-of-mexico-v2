import { defineType } from 'sanity'
import { MdImage } from 'react-icons/md'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  icon: MdImage,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
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
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
    },
    {
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small (40vh)', value: '40vh' },
          { title: 'Medium (60vh)', value: '60vh' },
          { title: 'Large (80vh)', value: '80vh' },
          { title: 'Full Screen (100vh)', value: '100vh' },
        ],
      },
      initialValue: '60vh',
    },
    {
      name: 'overlay',
      title: 'Dark Overlay',
      type: 'boolean',
      description: 'Add dark overlay to improve text readability',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'Full-width hero banner',
        media,
      }
    },
  },
})
