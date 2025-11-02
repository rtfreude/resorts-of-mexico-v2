import { defineType } from 'sanity'
import { MdExpandMore } from 'react-icons/md'

export default defineType({
  name: 'accordionBlock',
  title: 'Accordion',
  type: 'object',
  icon: MdExpandMore,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above the accordion',
    },
    {
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Question/Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Answer/Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
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
          ],
          preview: {
            select: {
              title: 'title',
              content: 'content',
            },
            prepare({ title, content }) {
              const block = content?.find((item: any) => item._type === 'block')
              const text = block?.children?.[0]?.text || ''
              return {
                title: title || 'Untitled Item',
                subtitle: text.substring(0, 60) + (text.length > 60 ? '...' : ''),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'style',
      title: 'Accordion Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Cards', value: 'cards' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple accordion items to be open at once',
      initialValue: false,
    },
    {
      name: 'firstOpen',
      title: 'First Item Open by Default',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare({ title, itemCount }) {
      return {
        title: title || 'Accordion',
        subtitle: `${itemCount || 0} items`,
      }
    },
  },
})
