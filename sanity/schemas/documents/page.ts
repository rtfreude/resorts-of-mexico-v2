import { defineField, defineType } from 'sanity'
import { MdPages } from 'react-icons/md'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: MdPages,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'destinationGridBlock' },
        { type: 'ctaBlock' },
      ],
      description: 'Build your page by adding content blocks',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'showBreadcrumbs',
      title: 'Show Breadcrumbs',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Recently Published',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
