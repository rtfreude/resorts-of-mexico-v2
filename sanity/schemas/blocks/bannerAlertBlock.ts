import { defineType } from 'sanity'
import { MdNotifications } from 'react-icons/md'

export default defineType({
  name: 'bannerAlertBlock',
  title: 'Banner Alert',
  type: 'object',
  icon: MdNotifications,
  fields: [
    {
      name: 'message',
      title: 'Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Alert Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' },
          { title: 'Error', value: 'error' },
          { title: 'Promotion', value: 'promotion' },
        ],
      },
      initialValue: 'info',
    },
    {
      name: 'showIcon',
      title: 'Show Icon',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'dismissible',
      title: 'Dismissible',
      type: 'boolean',
      description: 'Allow users to close the alert',
      initialValue: false,
    },
    {
      name: 'cta',
      title: 'Call to Action (Optional)',
      type: 'cta',
    },
  ],
  preview: {
    select: {
      message: 'message',
      type: 'type',
    },
    prepare({ message, type }) {
      return {
        title: message,
        subtitle: `${type} alert`,
      }
    },
  },
})
