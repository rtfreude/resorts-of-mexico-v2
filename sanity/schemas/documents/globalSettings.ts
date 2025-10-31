import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of your website',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default meta description for SEO',
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      description: 'Main brand color used throughout the site',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
      description: 'Secondary brand color for accents',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main logo (light background)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      description: 'Logo for dark backgrounds (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      description: 'Main font family (Google Fonts name)',
      initialValue: 'Inter',
      options: {
        list: [
          { title: 'Inter', value: 'Inter' },
          { title: 'Roboto', value: 'Roboto' },
          { title: 'Open Sans', value: 'Open Sans' },
          { title: 'Lato', value: 'Lato' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Poppins', value: 'Poppins' },
          { title: 'Playfair Display', value: 'Playfair Display' },
          { title: 'Merriweather', value: 'Merriweather' },
        ],
      },
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'pinterest', type: 'url', title: 'Pinterest' },
      ],
    }),
    defineField({
      name: 'defaultAffiliateId',
      title: 'Default Affiliate ID',
      type: 'string',
      description: 'Fallback affiliate ID to use if not specified per link',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Default social sharing image (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
