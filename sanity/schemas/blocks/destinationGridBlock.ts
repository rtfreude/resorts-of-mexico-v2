import { defineType } from 'sanity'
import { MdGridOn } from 'react-icons/md'

export default defineType({
  name: 'destinationGridBlock',
  title: 'Destination Grid',
  type: 'object',
  icon: MdGridOn,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'destinations',
      title: 'Destinations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'destination' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    },
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 3,
    },
    {
      name: 'showFeaturedOnly',
      title: 'Show Featured Only',
      type: 'boolean',
      initialValue: false,
      description: 'Auto-populate with featured destinations instead of manual selection',
    },
  ],
  preview: {
    select: {
      title: 'title',
      count: 'destinations.length',
    },
    prepare({ title, count }) {
      return {
        title: title || 'Destination Grid',
        subtitle: `${count || 0} destinations`,
      }
    },
  },
})
