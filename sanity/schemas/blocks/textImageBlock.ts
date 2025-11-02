import { defineType } from 'sanity'
import { MdViewQuilt } from 'react-icons/md'

export default defineType({
  name: 'textImageBlock',
  title: 'Text & Image',
  type: 'object',
  icon: MdViewQuilt,
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
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
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
      initialValue: 'right',
    },
    {
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      description: 'Size of image relative to text (only for left/right positions)',
      options: {
        list: [
          { title: '30%', value: '30' },
          { title: '40%', value: '40' },
          { title: '50%', value: '50' },
          { title: '60%', value: '60' },
        ],
      },
      initialValue: '50',
      hidden: ({ parent }) => parent?.imagePosition === 'top' || parent?.imagePosition === 'bottom',
    },
    {
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      description: 'How to align content vertically (only for left/right positions)',
      options: {
        list: [
          { title: 'Top', value: 'flex-start' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'flex-end' },
        ],
      },
      initialValue: 'center',
      hidden: ({ parent }) => parent?.imagePosition === 'top' || parent?.imagePosition === 'bottom',
    },
    {
      name: 'imageStyle',
      title: 'Image Style',
      type: 'string',
      options: {
        list: [
          { title: 'Rounded Corners', value: 'rounded' },
          { title: 'Square', value: 'square' },
          { title: 'With Shadow', value: 'shadow' },
        ],
      },
      initialValue: 'rounded',
    },
    {
      name: 'reverseOnMobile',
      title: 'Reverse Order on Mobile',
      type: 'boolean',
      description: 'Show image first on mobile devices',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      media: 'image',
      content: 'content',
      position: 'imagePosition',
    },
    prepare({ media, content, position }) {
      const block = content?.find((item: any) => item._type === 'block')
      const text = block?.children?.[0]?.text || ''
      return {
        title: 'Text & Image',
        subtitle: `Image ${position} | ${text.substring(0, 40)}${text.length > 40 ? '...' : ''}`,
        media,
      }
    },
  },
})
