import { defineField, defineType } from 'sanity'
import { MdMenu } from 'react-icons/md'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MdMenu,
  // This is a singleton - only one document allowed
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      readOnly: true,
    }),
    defineField({
      name: 'mainMenu',
      title: 'Main Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' },
                  { title: 'Dropdown Menu', value: 'dropdown' },
                ],
              },
              initialValue: 'internal',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'internalLink',
              title: 'Internal Link',
              type: 'reference',
              to: [{ type: 'destination' }, { type: 'article' }],
              hidden: ({ parent }) => parent?.linkType !== 'internal',
            },
            {
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({ parent }) => parent?.linkType !== 'external',
            },
            {
              name: 'customPath',
              title: 'Custom Path',
              type: 'string',
              description: 'Custom internal path (e.g., "/destinations", "/blog")',
              hidden: ({ parent }) => parent?.linkType !== 'internal',
            },
            {
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              hidden: ({ parent }) => parent?.linkType !== 'dropdown',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'linkType',
                      title: 'Link Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Internal Page', value: 'internal' },
                          { title: 'External URL', value: 'external' },
                        ],
                      },
                      initialValue: 'internal',
                    },
                    {
                      name: 'internalLink',
                      title: 'Internal Link',
                      type: 'reference',
                      to: [{ type: 'destination' }, { type: 'article' }],
                      hidden: ({ parent }) => parent?.linkType !== 'internal',
                    },
                    {
                      name: 'customPath',
                      title: 'Custom Path',
                      type: 'string',
                      hidden: ({ parent }) => parent?.linkType !== 'internal',
                    },
                    {
                      name: 'externalUrl',
                      title: 'External URL',
                      type: 'url',
                      hidden: ({ parent }) => parent?.linkType !== 'external',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                      description: 'Optional description for mega menus',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      linkType: 'linkType',
                    },
                    prepare({ title, linkType }) {
                      return {
                        title,
                        subtitle: linkType === 'external' ? 'External' : 'Internal',
                      }
                    },
                  },
                },
              ],
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => parent?.linkType === 'dropdown',
            },
          ],
          preview: {
            select: {
              title: 'title',
              linkType: 'linkType',
            },
            prepare({ title, linkType }) {
              const icons: Record<string, string> = {
                internal: '📄',
                external: '🔗',
                dropdown: '▼',
              }
              return {
                title,
                subtitle: icons[linkType] || '',
              }
            },
          },
        },
      ],
      description: 'Primary navigation items',
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'object',
      fields: [
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Column Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'title',
                          title: 'Title',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: 'linkType',
                          title: 'Link Type',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Internal Page', value: 'internal' },
                              { title: 'External URL', value: 'external' },
                            ],
                          },
                          initialValue: 'internal',
                        },
                        {
                          name: 'internalLink',
                          title: 'Internal Link',
                          type: 'reference',
                          to: [{ type: 'destination' }, { type: 'article' }],
                          hidden: ({ parent }) => parent?.linkType !== 'internal',
                        },
                        {
                          name: 'customPath',
                          title: 'Custom Path',
                          type: 'string',
                          hidden: ({ parent }) => parent?.linkType !== 'internal',
                        },
                        {
                          name: 'externalUrl',
                          title: 'External URL',
                          type: 'url',
                          hidden: ({ parent }) => parent?.linkType !== 'external',
                        },
                      ],
                      preview: {
                        select: {
                          title: 'title',
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  linksCount: 'links.length',
                },
                prepare({ title, linksCount }) {
                  return {
                    title,
                    subtitle: `${linksCount || 0} links`,
                  }
                },
              },
            },
          ],
        },
      ],
      description: 'Footer navigation columns',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Site Navigation',
        subtitle: 'Main menu and footer links',
      }
    },
  },
})
