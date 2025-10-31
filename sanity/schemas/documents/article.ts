import { defineField, defineType } from 'sanity'
import { MdArticle } from 'react-icons/md'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: MdArticle,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'Article headline (60-70 characters recommended for SEO)',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief summary for article cards and previews (150-200 characters)',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      description: 'Related keywords and topics',
    }),
    defineField({
      name: 'relatedDestinations',
      title: 'Related Destinations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
      description: 'Destinations mentioned or featured in this article',
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
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
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                  {
                    name: 'isAffiliate',
                    type: 'boolean',
                    title: 'Affiliate Link',
                    description: 'Mark as affiliate link (adds rel="nofollow")',
                    initialValue: false,
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Link to',
                    to: [{ type: 'destination' }, { type: 'article' }],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Tip', value: 'tip' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 3,
            },
          ],
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Video',
          fields: [
            {
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().custom((url) => {
                  if (!url) return true
                  if (
                    url.includes('youtube.com/watch') ||
                    url.includes('youtu.be/')
                  ) {
                    return true
                  }
                  return 'Must be a valid YouTube URL'
                }),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time (will be calculated if left blank)',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      description: 'Manually select related articles (or auto-generated)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      description: 'Last significant content update (not minor edits)',
    }),
    // SEO Fields
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
          description: 'Custom title for search engines (leave blank to use article title)',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: 'Description for search results (150-160 characters)',
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
          description: 'Primary keyword to rank for',
        },
        {
          name: 'keywords',
          title: 'Additional Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Custom image for social media (uses featured image if not set)',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Highlight this article on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      featured: 'featured',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, author, media, featured, publishedAt } = selection
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'Draft'
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${author || 'No author'} • ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})
