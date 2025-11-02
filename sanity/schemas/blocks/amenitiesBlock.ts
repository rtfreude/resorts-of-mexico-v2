import { defineType } from 'sanity'
import { MdCheckCircle } from 'react-icons/md'

export default defineType({
  name: 'amenitiesBlock',
  title: 'Amenities List',
  type: 'object',
  icon: MdCheckCircle,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above amenities',
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Amenity Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
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
            {
              name: 'description',
              title: 'Description (Optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              media: 'icon',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Compact Columns', value: 'columns' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      description: 'For grid layout',
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
      hidden: ({ parent }) => parent?.layout !== 'grid',
    },
    {
      name: 'showIcons',
      title: 'Show Icons',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showDescriptions',
      title: 'Show Descriptions',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      amenityCount: 'amenities.length',
    },
    prepare({ title, amenityCount }) {
      return {
        title: title || 'Amenities',
        subtitle: `${amenityCount || 0} amenities`,
      }
    },
  },
})
