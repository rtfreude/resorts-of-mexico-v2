import { defineType } from 'sanity'
import { MdViewModule } from 'react-icons/md'

export default defineType({
  name: 'cardGridBlock',
  title: 'Card Grid',
  type: 'object',
  icon: MdViewModule,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above the card grid',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Icon or small image for the card',
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
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link (Optional)',
              type: 'cta',
            },
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
              media: 'icon',
            },
            prepare({ title, description, media }) {
              return {
                title: title || 'Untitled Card',
                subtitle: description?.substring(0, 60) || '',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
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
          { title: 'Auto (Responsive)', value: 'auto' },
        ],
      },
      initialValue: '3',
    },
    {
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default (White)', value: 'default' },
          { title: 'Outlined', value: 'outlined' },
          { title: 'Elevated (Shadow)', value: 'elevated' },
          { title: 'Flat (No Border)', value: 'flat' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Left', value: 'left' },
        ],
      },
      initialValue: 'top',
    },
    {
      name: 'textAlign',
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
      cardCount: 'cards.length',
      columns: 'columns',
    },
    prepare({ title, cardCount, columns }) {
      return {
        title: title || 'Card Grid',
        subtitle: `${cardCount || 0} cards in ${columns} columns`,
      }
    },
  },
})
