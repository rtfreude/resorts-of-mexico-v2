import { defineType } from 'sanity'
import { MdTab } from 'react-icons/md'

export default defineType({
  name: 'tabBlock',
  title: 'Tabs',
  type: 'object',
  icon: MdTab,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above the tabs',
    },
    {
      name: 'tabs',
      title: 'Tab Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'tabTitle',
              title: 'Tab Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Tab Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
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
              title: 'tabTitle',
              content: 'content',
            },
            prepare({ title, content }) {
              const block = content?.find((item: any) => item._type === 'block')
              const text = block?.children?.[0]?.text || ''
              return {
                title: title || 'Untitled Tab',
                subtitle: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(8),
    },
    {
      name: 'tabStyle',
      title: 'Tab Style',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Scrollable', value: 'scrollable' },
        ],
      },
      initialValue: 'standard',
    },
    {
      name: 'tabAlignment',
      title: 'Tab Alignment',
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
      title: 'title',
      tabCount: 'tabs.length',
    },
    prepare({ title, tabCount }) {
      return {
        title: title || 'Tab Block',
        subtitle: `${tabCount || 0} tabs`,
      }
    },
  },
})
