import { defineType } from 'sanity'
import { MdCallToAction } from 'react-icons/md'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  icon: MdCallToAction,
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
      name: 'cta',
      title: 'Call to Action Button',
      type: 'cta',
      validation: (Rule) => Rule.required(),
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
        },
      ],
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Left Aligned', value: 'left' },
          { title: 'With Background', value: 'background' },
        ],
      },
      initialValue: 'centered',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'CTA Block',
        subtitle: subtitle || 'Call to action section',
      }
    },
  },
})
