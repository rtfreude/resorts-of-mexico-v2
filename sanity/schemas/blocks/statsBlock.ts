import { defineType } from 'sanity'
import { MdBarChart } from 'react-icons/md'

export default defineType({
  name: 'statsBlock',
  title: 'Stats',
  type: 'object',
  icon: MdBarChart,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above the stats',
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'e.g., "500+", "95%", "24/7"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What this number represents',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon (Optional)',
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
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
              media: 'icon',
            },
            prepare({ number, label, media }) {
              return {
                title: number,
                subtitle: label,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
          { title: '5 Columns', value: '5' },
          { title: 'Auto (Responsive)', value: 'auto' },
        ],
      },
      initialValue: '4',
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Boxed', value: 'boxed' },
          { title: 'Highlighted', value: 'highlighted' },
        ],
      },
      initialValue: 'minimal',
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
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
      statCount: 'stats.length',
    },
    prepare({ title, statCount }) {
      return {
        title: title || 'Stats Block',
        subtitle: `${statCount || 0} statistics`,
      }
    },
  },
})
