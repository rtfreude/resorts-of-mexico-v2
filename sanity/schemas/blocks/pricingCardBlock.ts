import { defineType } from 'sanity'
import { MdLocalOffer } from 'react-icons/md'

export default defineType({
  name: 'pricingCardBlock',
  title: 'Pricing Cards',
  type: 'object',
  icon: MdLocalOffer,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above pricing cards',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional description text',
    },
    {
      name: 'cards',
      title: 'Pricing Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Plan Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "$99", "Free", "Contact Us"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'period',
              title: 'Billing Period',
              type: 'string',
              description: 'e.g., "per night", "per person", "one-time"',
            },
            {
              name: 'badge',
              title: 'Badge Text',
              type: 'string',
              description: 'e.g., "Popular", "Best Value", "Limited"',
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'cta',
              title: 'Call to Action',
              type: 'cta',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'highlighted',
              title: 'Highlight This Card',
              type: 'boolean',
              description: 'Make this the featured/recommended option',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              price: 'price',
              highlighted: 'highlighted',
            },
            prepare({ title, price, highlighted }) {
              return {
                title: highlighted ? `⭐ ${title}` : title,
                subtitle: price,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      options: {
        list: [
          { title: '1 Column', value: '1' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '3',
    },
  ],
  preview: {
    select: {
      title: 'title',
      cardCount: 'cards.length',
    },
    prepare({ title, cardCount }) {
      return {
        title: title || 'Pricing Cards',
        subtitle: `${cardCount || 0} pricing options`,
      }
    },
  },
})
