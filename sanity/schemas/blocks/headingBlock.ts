import { defineType } from 'sanity'
import { MdTitle } from 'react-icons/md'

export default defineType({
  name: 'headingBlock',
  title: 'Heading',
  type: 'object',
  icon: MdTitle,
  fields: [
    {
      name: 'text',
      title: 'Heading Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Heading Level',
      type: 'string',
      options: {
        list: [
          { title: 'H1 (Extra Large)', value: 'h1' },
          { title: 'H2 (Large)', value: 'h2' },
          { title: 'H3 (Medium)', value: 'h3' },
          { title: 'H4 (Small)', value: 'h4' },
          { title: 'H5 (Extra Small)', value: 'h5' },
          { title: 'H6 (Tiny)', value: 'h6' },
        ],
      },
      initialValue: 'h2',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    },
    {
      name: 'style',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Accent Color', value: 'accent' },
          { title: 'Eyebrow (Small Caps)', value: 'eyebrow' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      description: 'Space above and below heading',
      options: {
        list: [
          { title: 'None', value: 'none' },
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
      text: 'text',
      level: 'level',
    },
    prepare({ text, level }) {
      return {
        title: text,
        subtitle: level?.toUpperCase() || 'Heading',
      }
    },
  },
})
