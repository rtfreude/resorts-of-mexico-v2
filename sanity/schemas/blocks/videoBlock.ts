import { defineType } from 'sanity'
import { MdPlayCircle } from 'react-icons/md'

export default defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  icon: MdPlayCircle,
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Optional title above the video',
    },
    {
      name: 'videoSource',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
        ],
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Full YouTube or Vimeo URL',
      validation: (Rule) =>
        Rule.required().custom((url: any, context: any) => {
          if (!url) return true
          const urlStr = String(url)
          const parent = context.parent as any
          if (parent?.videoSource === 'youtube') {
            if (urlStr.includes('youtube.com') || urlStr.includes('youtu.be')) {
              return true
            }
            return 'Must be a valid YouTube URL'
          }
          if (parent?.videoSource === 'vimeo') {
            if (urlStr.includes('vimeo.com')) {
              return true
            }
            return 'Must be a valid Vimeo URL'
          }
          return true
        }),
    },
    {
      name: 'thumbnail',
      title: 'Custom Thumbnail (Optional)',
      type: 'image',
      description: 'Override default video thumbnail',
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
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Standard)', value: '16/9' },
          { title: '4:3 (Classic)', value: '4/3' },
          { title: '21:9 (Ultrawide)', value: '21/9' },
          { title: '1:1 (Square)', value: '1/1' },
        ],
      },
      initialValue: '16/9',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional text below video',
    },
    {
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small (600px)', value: 'small' },
          { title: 'Medium (800px)', value: 'medium' },
          { title: 'Large (1000px)', value: 'large' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'large',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
      source: 'videoSource',
    },
    prepare({ title, url, source }) {
      return {
        title: title || 'Video',
        subtitle: `${source} - ${url?.substring(0, 40)}...`,
      }
    },
  },
})
