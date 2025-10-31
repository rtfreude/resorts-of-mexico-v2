import { defineType } from 'sanity'
import { MdCallToAction } from 'react-icons/md'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: MdCallToAction,
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
          { title: 'Affiliate Link', value: 'affiliate' },
        ],
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [{ type: 'destination' }, { type: 'article' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
    {
      name: 'customPath',
      title: 'Custom Path',
      type: 'string',
      description: 'Custom internal path (e.g., "/destinations", "/contact")',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    },
    {
      name: 'affiliateUrl',
      title: 'Affiliate URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'affiliate',
      description: 'Full affiliate link with tracking parameters',
    },
    {
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Filled)', value: 'primary' },
          { title: 'Secondary (Outlined)', value: 'secondary' },
          { title: 'Text Only', value: 'text' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'size',
      title: 'Button Size',
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
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === 'internal',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Arrow Right →', value: 'arrow-right' },
          { title: 'External Link ↗', value: 'external' },
          { title: 'Download ⬇', value: 'download' },
          { title: 'Heart ❤', value: 'heart' },
          { title: 'Star ⭐', value: 'star' },
        ],
      },
      initialValue: 'none',
    },
  ],
  preview: {
    select: {
      text: 'text',
      linkType: 'linkType',
      style: 'style',
    },
    prepare({ text, linkType, style }) {
      const linkIcons: Record<string, string> = {
        internal: '📄',
        external: '🔗',
        affiliate: '💰',
      }
      return {
        title: text,
        subtitle: `${style || 'primary'} ${linkIcons[linkType] || ''}`,
      }
    },
  },
})
