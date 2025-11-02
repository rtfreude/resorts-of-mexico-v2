import { defineType } from 'sanity'
import { MdRateReview } from 'react-icons/md'

export default defineType({
  name: 'testimonialCarouselBlock',
  title: 'Testimonial Carousel',
  type: 'object',
  icon: MdRateReview,
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above testimonials',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Testimonial Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'authorLocation',
              title: 'Author Location',
              type: 'string',
              description: 'e.g., "Los Angeles, CA"',
            },
            {
              name: 'authorImage',
              title: 'Author Image',
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
              name: 'rating',
              title: 'Rating',
              type: 'number',
              description: 'Star rating from 1-5',
              validation: (Rule) => Rule.min(1).max(5).precision(1),
            },
          ],
          preview: {
            select: {
              quote: 'quote',
              author: 'author',
              media: 'authorImage',
            },
            prepare({ quote, author, media }) {
              return {
                title: author || 'Unnamed',
                subtitle: quote.substring(0, 60) + (quote.length > 60 ? '...' : ''),
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Single Slide', value: 'single' },
          { title: 'Multiple Visible', value: 'multi' },
        ],
      },
      initialValue: 'single',
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically rotate testimonials',
      initialValue: true,
    },
    {
      name: 'showNavigation',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showIndicators',
      title: 'Show Indicators',
      type: 'boolean',
      description: 'Show dot indicators at bottom',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      testimonialCount: 'testimonials.length',
    },
    prepare({ title, testimonialCount }) {
      return {
        title: title || 'Testimonial Carousel',
        subtitle: `${testimonialCount || 0} testimonials`,
      }
    },
  },
})
