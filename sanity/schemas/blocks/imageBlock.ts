import { defineType } from 'sanity'
import { MdImage } from 'react-icons/md'

export default defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  icon: MdImage,
  fields: [
    {
      name: 'image',
      title: 'Image',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'size',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'large',
    },
  ],
  preview: {
    select: {
      media: 'image',
      caption: 'image.caption',
    },
    prepare({ media, caption }) {
      return {
        title: 'Image Block',
        subtitle: caption || 'No caption',
        media,
      }
    },
  },
})
