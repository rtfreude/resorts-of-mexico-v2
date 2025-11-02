import { defineType } from 'sanity'
import { MdViewWeek } from 'react-icons/md'

export default defineType({
  name: 'twoColumnTextBlock',
  title: 'Two-Column Text',
  type: 'object',
  icon: MdViewWeek,
  fields: [
    {
      name: 'leftColumn',
      title: 'Left Column Content',
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
      name: 'rightColumn',
      title: 'Right Column Content',
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
      name: 'columnRatio',
      title: 'Column Ratio',
      type: 'string',
      options: {
        list: [
          { title: '50/50 (Equal)', value: '50-50' },
          { title: '60/40 (Left Wider)', value: '60-40' },
          { title: '40/60 (Right Wider)', value: '40-60' },
          { title: '70/30 (Left Much Wider)', value: '70-30' },
          { title: '30/70 (Right Much Wider)', value: '30-70' },
        ],
      },
      initialValue: '50-50',
    },
    {
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'flex-start' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'flex-end' },
        ],
      },
      initialValue: 'flex-start',
    },
    {
      name: 'gap',
      title: 'Gap Between Columns',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    },
  ],
  preview: {
    select: {
      leftContent: 'leftColumn',
      rightContent: 'rightColumn',
      ratio: 'columnRatio',
    },
    prepare({ leftContent, rightContent, ratio }) {
      const leftBlock = leftContent?.find((item: any) => item._type === 'block')
      const rightBlock = rightContent?.find((item: any) => item._type === 'block')
      const leftText = leftBlock?.children?.[0]?.text || 'Left column'
      const rightText = rightBlock?.children?.[0]?.text || 'Right column'
      return {
        title: 'Two-Column Text',
        subtitle: `${ratio} | ${leftText.substring(0, 25)}... | ${rightText.substring(0, 25)}...`,
      }
    },
  },
})
