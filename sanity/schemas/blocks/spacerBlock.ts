import { defineType } from 'sanity'
import { MdHorizontalRule } from 'react-icons/md'

export default defineType({
  name: 'spacerBlock',
  title: 'Spacer',
  type: 'object',
  icon: MdHorizontalRule,
  fields: [
    {
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small (1rem / 16px)', value: 'xs' },
          { title: 'Small (2rem / 32px)', value: 'sm' },
          { title: 'Medium (4rem / 64px)', value: 'md' },
          { title: 'Large (6rem / 96px)', value: 'lg' },
          { title: 'Extra Large (8rem / 128px)', value: 'xl' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'md',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customHeight',
      title: 'Custom Height (pixels)',
      type: 'number',
      description: 'Only used if Height is set to "Custom"',
      validation: (Rule) => Rule.min(1).max(500),
      hidden: ({ parent }) => parent?.height !== 'custom',
    },
    {
      name: 'dividerStyle',
      title: 'Divider Style',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Solid Line', value: 'solid' },
          { title: 'Dashed Line', value: 'dashed' },
          { title: 'Dotted Line', value: 'dotted' },
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'dividerWidth',
      title: 'Divider Width',
      type: 'string',
      description: 'Only applies if divider style is not "None"',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Contained (800px)', value: 'contained' },
          { title: 'Short (200px)', value: 'short' },
        ],
      },
      initialValue: 'full',
      hidden: ({ parent }) => parent?.dividerStyle === 'none',
    },
  ],
  preview: {
    select: {
      height: 'height',
      divider: 'dividerStyle',
    },
    prepare({ height, divider }) {
      const heightLabel = height === 'xs' ? 'XS' : height === 'sm' ? 'Small' : height === 'md' ? 'Medium' : height === 'lg' ? 'Large' : height === 'xl' ? 'XL' : 'Custom'
      const dividerLabel = divider !== 'none' ? ` with ${divider} divider` : ''
      return {
        title: `Spacer - ${heightLabel}`,
        subtitle: dividerLabel || 'Vertical spacing',
      }
    },
  },
})
