import { defineType } from 'sanity'
import { MdTextFields } from 'react-icons/md'

export default defineType({
  name: 'textBlock',
  title: 'Text Content',
  type: 'object',
  icon: MdTextFields,
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
            { title: 'Quote', value: 'blockquote' },
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
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const block = content?.find((item: any) => item._type === 'block')
      const text = block?.children?.[0]?.text || ''
      return {
        title: 'Text Content',
        subtitle: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      }
    },
  },
})
