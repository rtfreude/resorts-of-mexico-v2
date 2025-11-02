import { defineField, defineType } from 'sanity'
import { MdWbSunny } from 'react-icons/md'

export default defineType({
  name: 'weatherBlock',
  title: 'Weather Widget',
  type: 'object',
  icon: MdWbSunny,
  description: 'Display climate and weather information for destinations',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the weather section',
      initialValue: 'Climate & Weather',
    }),
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
      description: 'Name of the destination (e.g., "Cancun, Mexico")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyData',
      title: 'Monthly Weather Data',
      type: 'array',
      description: 'Weather information for each month',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'month',
              title: 'Month',
              type: 'string',
              options: {
                list: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'highTemp',
              title: 'Average High (°F)',
              type: 'number',
              validation: (Rule) => Rule.required().min(-50).max(150),
            },
            {
              name: 'lowTemp',
              title: 'Average Low (°F)',
              type: 'number',
              validation: (Rule) => Rule.required().min(-50).max(150),
            },
            {
              name: 'rainfall',
              title: 'Rainfall (inches)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(50),
            },
            {
              name: 'rainyDays',
              title: 'Rainy Days',
              type: 'number',
              description: 'Average number of days with rain',
              validation: (Rule) => Rule.min(0).max(31),
            },
            {
              name: 'humidity',
              title: 'Humidity (%)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
            },
          ],
          preview: {
            select: {
              month: 'month',
              high: 'highTemp',
              low: 'lowTemp',
            },
            prepare({ month, high, low }) {
              return {
                title: month,
                subtitle: `${high}°F / ${low}°F`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'object',
      fields: [
        {
          name: 'months',
          title: 'Months',
          type: 'string',
          description: 'e.g., "November to April"',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Why this is the best time',
        },
      ],
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      description: 'How to display the weather data',
      options: {
        list: [
          { title: 'Chart View', value: 'chart' },
          { title: 'Table View', value: 'table' },
          { title: 'Card Grid', value: 'cards' },
        ],
        layout: 'radio',
      },
      initialValue: 'chart',
    }),
    defineField({
      name: 'showMetrics',
      title: 'Metrics to Display',
      type: 'object',
      description: 'Choose which weather metrics to show',
      fields: [
        {
          name: 'temperature',
          title: 'Temperature',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'rainfall',
          title: 'Rainfall',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'rainyDays',
          title: 'Rainy Days',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'humidity',
          title: 'Humidity',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background for the weather widget',
      options: {
        list: [
          { title: 'Light Blue', value: 'lightblue' },
          { title: 'Light Grey', value: 'grey' },
          { title: 'White', value: 'white' },
          { title: 'Gradient', value: 'gradient' },
        ],
        layout: 'radio',
      },
      initialValue: 'lightblue',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'locationName',
      dataCount: 'monthlyData.length',
    },
    prepare(selection) {
      const { title, location, dataCount } = selection
      return {
        title: title || 'Weather Widget',
        subtitle: `${location} • ${dataCount || 0} months`,
        media: MdWbSunny,
      }
    },
  },
})
