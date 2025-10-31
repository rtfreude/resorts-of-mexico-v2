import { defineField, defineType } from 'sanity'
import { MdPerson } from 'react-icons/md'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: MdPerson,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          initialValue: 'Author profile photo',
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(300),
      description: 'Short biography (200-300 characters)',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'e.g., "Beach Destinations", "Adventure Travel", "Food & Culture"',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Staff Writer', value: 'staff' },
          { title: 'Contributing Writer', value: 'contributor' },
          { title: 'Editor', value: 'editor' },
          { title: 'Guest Author', value: 'guest' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter/X Handle',
          type: 'string',
          description: 'Without @ symbol (e.g., "username")',
        },
        {
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string',
          description: 'Without @ symbol',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn Profile URL',
          type: 'url',
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      description: 'Author contact email (not displayed publicly)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      const roleLabels: Record<string, string> = {
        staff: 'Staff Writer',
        contributor: 'Contributing Writer',
        editor: 'Editor',
        guest: 'Guest Author',
      }
      return {
        title,
        subtitle: roleLabels[subtitle as string] || subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
